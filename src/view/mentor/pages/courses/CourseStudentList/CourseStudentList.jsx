import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Table,
  Card,
  Button,
  Popconfirm,
  message,
  Space,
  Tag,
  Modal,
  Descriptions,
} from "antd";
import {
  ArrowLeftOutlined,
  UserAddOutlined,
  UndoOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { formatDate } from "../../../../../utils/helper/formatDate";
import courseApi from "../../../../../api/courseApi";

const CourseStudentList = () => {
  const location = useLocation();
  const courseId = location.state?.courseId;
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (courseId) fetchStudents();
  }, [courseId]);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await courseApi.getStudentsByCourse(courseId);
      // console.log("Students:", response.data);
      setStudents(response.data || []);
    } catch (error) {
      message.error("Không thể tải danh sách học viên.");
    } finally {
      setLoading(false);
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

  const renderRoleTag = (role) => {
    if (!role) return <Tag>Chưa xác định</Tag>;
    const normalizedRole = role.toLowerCase();
    if (normalizedRole === "mentor")
      return <Tag color="green">Giảng viên</Tag>;
    if (normalizedRole === "student")
      return <Tag color="blue">Học viên</Tag>;
    return <Tag>{role}</Tag>;
  };

  const renderActions = (record) => (
    <Space>
      <Button icon={<EyeOutlined />} onClick={() => showStudentDetails(record)}>
        Xem chi tiết
      </Button>

      {record.role.toLowerCase() === "student" ? (
        <Button
          type="primary"
          icon={<UserAddOutlined />}
          // onClick={() => inviteAsMentor(record.id)}
        >
          Mời làm giảng viên
        </Button>
      ) : (
        <Button
          type="dashed"
          icon={<UndoOutlined />}
          // onClick={() => undoMentor(record.id)}
        >
          Hoàn tác giảng viên
        </Button>
      )}

      <Popconfirm
        title="Bạn có chắc muốn xóa học viên này?"
        // onConfirm={() => removeStudent(record.id)}
        okText="Có"
        cancelText="Không"
      >
        <Button danger icon={<DeleteOutlined />}>
          Xóa
        </Button>
      </Popconfirm>
    </Space>
  );

  // Hàm chuyển mảng [năm, tháng, ngày, giờ, phút, giây] thành Date object
  const parseDateArray = (arr) => {
    if (!arr || !Array.isArray(arr) || arr.length < 6) return null;
    // Tháng trong Date bắt đầu từ 0 nên trừ 1
    return new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
  };

  const columns = [
    {
      title: "Họ và tên",
      key: "fullName",
      render: (text, record) => (
        <b>{`${record.firstName || ""} ${record.lastName || ""}`.trim()}</b>
      ),
    },
    {
      title: "Email",
      dataIndex: "emailId",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      render: renderRoleTag,
    },
    {
      title: "Hành động",
      render: (_, record) => renderActions(record),
    },
  ];

  return (
    <Card
      title="Danh sách học viên"
      style={{ maxWidth: 1200, margin: "auto" }}
      extra={
        <Button
          type="primary"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
        >
          Quay lại
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
            <Descriptions.Item label="Họ và tên">
              {`${selectedStudent.firstName || ""} ${selectedStudent.lastName || ""}`.trim()}
            </Descriptions.Item>
            <Descriptions.Item label="Email">{selectedStudent.emailId || "Chưa có"}</Descriptions.Item>
            <Descriptions.Item label="Vai trò">{renderRoleTag(selectedStudent.role)}</Descriptions.Item>
            <Descriptions.Item label="Số điện thoại">{selectedStudent.phoneNo || "Chưa có"}</Descriptions.Item>
            <Descriptions.Item label="Ngày đăng ký">
              {formatDate(selectedStudent.createdAt) || "Chưa có"}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </Card>
  );
};

export default CourseStudentList;
