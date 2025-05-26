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
  Tooltip,
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
import assignmentApi from "../../../../../api/assignmentApi";
import { toast } from "react-toastify";

const CourseStudentList = () => {
  const location = useLocation();
  const courseId = location.state?.courseId;
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [assignmentSubmissionsComplete, setAssignmentSubmissionsComplete] = useState([]);
  

  useEffect(() => {
    if (courseId) {
      fetchStudents();
      fetchAssignments();
      fetchSubmissionsByGradedAndStudentID();
    }
  }, [courseId]);

  useEffect(() => {
    if (students.length > 0) {
      fetchSubmissionsByGradedAndStudentID();
    }
  }, [students]);

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

   const fetchAssignments = async () => {
    setLoading(true);
    try {
      const res = await assignmentApi.fetchAllAssignments(courseId);
      setAssignments(res.data || []);
    } catch (err) {
      toast.error("Lỗi tải danh sách bài tập.");
    } finally {
      setLoading(false);
    }
  };

  const fetchSubmissionsByGradedAndStudentID = async () => {
    try {
      const allSubmissions = {};
      for (const student of students) {
        const res = await assignmentApi.getSubmissionsGradedByStudentID(student.id);
        console.log(`Submissions for ${student.id}:`, res.data);
        allSubmissions[student.id] = res.data.submissions || [];
      }
      setAssignmentSubmissionsComplete(allSubmissions);
    } catch (err) {
      toast.error("Lỗi tải danh sách bài nộp.");
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
    <Space wrap>
      <Tooltip title="Xem chi tiết">
        <Button 
          icon={<EyeOutlined />} 
          onClick={() => showStudentDetails(record)}
          style={{ backgroundColor: "#1677ff", color: "#fff" }}
        >
          Xem chi tiết
        </Button>
      </Tooltip>

      {record.role.toLowerCase() === "student" ? (
        <Tooltip title="Mời làm giảng viên">
          <Button
            type="primary"
            icon={<UserAddOutlined />}
            // onClick={() => inviteAsMentor(record.id)}
            style={{ backgroundColor: "#52c41a", color: "#fff" }}
          >
            Mời làm giảng viên
          </Button>
        </Tooltip>
      ) : (
        <Tooltip title="Hoàn tác giảng viên">
          <Button
            type="dashed"
            icon={<UndoOutlined />}
            style={{ color: "#1677ff" }}
            // onClick={() => undoMentor(record.id)}
          >
            Hoàn tác giảng viên
          </Button>
        </Tooltip>
      )}

      <Popconfirm
        title="Bạn có chắc muốn xóa học viên này?"
        // onConfirm={() => removeStudent(record.id)}
        okText="Có"
        cancelText="Không"
      >
        <Tooltip title="Xóa học viên">
          <Button 
            danger 
            icon={<DeleteOutlined />}
            style={{ backgroundColor: "#ff4d4f", color: "#fff" }}
          >
            Xóa
          </Button>
        </Tooltip>
      </Popconfirm>
    </Space>
  );

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
      title: "Tiến độ bài tập",
      key: "progress",
      render: (_, record) => {
        const submissions = assignmentSubmissionsComplete[record.id] || [];
        return `${submissions.length} / ${assignments.length}`;
      },
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
