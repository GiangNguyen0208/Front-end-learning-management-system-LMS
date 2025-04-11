import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Card, Button, Popconfirm, message, Space, Tag, Modal, Descriptions } from "antd";
import { ArrowLeftOutlined, UploadOutlined, UserAddOutlined, UndoOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
// import studentApi from "../../api/studentApi";
// import mentorApi from "../../api/mentorApi";
import { useParams } from "react-router-dom";

const CourseStudentList = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await studentApi.getStudentsByCourse(courseId);
      setStudents(response.data.students || []);
    } catch (error) {
      message.error("Không thể tải danh sách học viên.");
    } finally {
      setLoading(false);
    }
  };

  const removeStudent = async (studentId) => {
    try {
      await studentApi.removeStudentFromCourse(courseId, studentId);
      message.success("Xóa học viên thành công!");
      setStudents(students.filter((s) => s.id !== studentId));
    } catch (error) {
      message.error("Lỗi khi xóa học viên.");
    }
  };

  const inviteAsMentor = async (studentId) => {
    try {
      await mentorApi.inviteAsMentor(studentId);
      message.success("Đã mời học viên làm giảng viên!");
      fetchStudents();
    } catch (error) {
      message.error("Lỗi khi mời học viên.");
    }
  };

  const undoMentor = async (studentId) => {
    try {
      await mentorApi.undoMentorRole(studentId);
      message.success("Đã hoàn tác giảng viên!");
      fetchStudents();
    } catch (error) {
      message.error("Lỗi khi hoàn tác giảng viên.");
    }
  };

  const showStudentDetails = (student) => {
    setSelectedStudent(student);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedStudent(null);
  };

  const columns = [
    {
      title: "Họ và tên",
      dataIndex: "fullName",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      render: (role) => (
        <Tag color={role === "MENTOR" ? "green" : "blue"}>
          {role === "MENTOR" ? "Giảng viên" : "Học viên"}
        </Tag>
      ),
    },
    {
      title: "Hành động",
      render: (text, record) => (
        <Space>
          <Button icon={<EyeOutlined />} onClick={() => showStudentDetails(record)}>
            Xem chi tiết
          </Button>

          {record.role === "STUDENT" ? (
            <Button type="primary" icon={<UserAddOutlined />} onClick={() => inviteAsMentor(record.id)}>
              Mời làm giảng viên
            </Button>
          ) : (
            <Button type="dashed" icon={<UndoOutlined />} onClick={() => undoMentor(record.id)}>
              Hoàn tác giảng viên
            </Button>
          )}

          <Popconfirm
            title="Bạn có chắc muốn xóa học viên này?"
            // onConfirm={() => removeStudent(record.id)}
            okText="Có"
            cancelText="Không"
          >
            <Button danger icon={<DeleteOutlined />}>Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card 
      title="Danh sách học viên" 
      style={{ maxWidth: "1200px", margin: "auto" }}
      extra={
        <Button type="primary" icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} style={{ marginBottom: 16, marginLeft: 16 }}>
            Go Back
        </Button>
      }
    >
      <Table
        dataSource={students}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />

      {/* Modal hiển thị chi tiết học viên */}
      <Modal
        title="Chi tiết học viên"
        visible={isModalVisible}
        onCancel={closeModal}
        footer={[
          <Button key="close" onClick={closeModal}>
            Đóng
          </Button>,
        ]}
      >
        {selectedStudent && (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Họ và tên">{selectedStudent.fullName}</Descriptions.Item>
            <Descriptions.Item label="Email">{selectedStudent.email}</Descriptions.Item>
            <Descriptions.Item label="Vai trò">
              <Tag color={selectedStudent.role === "MENTOR" ? "green" : "blue"}>
                {selectedStudent.role === "MENTOR" ? "Giảng viên" : "Học viên"}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Số điện thoại">{selectedStudent.phone || "Chưa có"}</Descriptions.Item>
            <Descriptions.Item label="Ngày đăng ký">{selectedStudent.registeredDate || "Chưa có"}</Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </Card>
  );
};

export default CourseStudentList;
