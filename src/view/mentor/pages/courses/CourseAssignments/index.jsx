// pages/CourseAssignments.jsx
import {
  Card,
  Table,
  Button,
  Upload,
  Modal,
  Input,
  message,
  Space,
  Typography,
  Tooltip,
  Tag
} from "antd";
import { useState, useEffect, useContext } from "react";
import {
  UploadOutlined,
  PlusOutlined,
  EditOutlined,
  TeamOutlined,
  DeleteOutlined
} from "@ant-design/icons";
import { useLocation, useParams } from "react-router-dom";
import assignmentApi from "../../../../../api/assignmentApi";
import { toast } from "react-toastify";
import { formatDate } from "../../../../../utils/helper/formatDate";
import SubmittedAssignments from "./SubmittedAssignments";
import AuthContext from "../../../../../context/AuthProvider";

const { Text } = Typography;

const CourseAssignments = () => {
  const location = useLocation();
  const { id } = useParams();
  const courseId = location.state?.courseId || id;
  // const studentId = location.state?.studentId || null;

  const [assignments, setAssignments] = useState([]);
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [file, setFile] = useState(null);

  const [selectedAssignmentId, setSelectedAssignmentId] = useState(null);

  useEffect(() => {
    if (courseId) fetchAssignments();
  }, [courseId]);

  // const fetchAssignments = async () => {
  //   setLoading(true);
  //   try {
  //     const res = await assignmentApi.fetchAllAssignments(courseId);
  //     setAssignments(res.data || []);
  //   } catch (err) {
  //     toast.error("Lỗi tải danh sách bài tập.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchAssignments = async () => {
    setLoading(true);
    try {
      const res = await assignmentApi.fetchAllAssignments(courseId);
      const assignmentsWithUngraded = await Promise.all(
        (res.data || []).map(async (assignment) => {
          try {
            const submissionRes = await assignmentApi.getSubmissionsByAssignmentId(assignment.id);
            const ungradedCount = (submissionRes.data || []).filter(s => !s.score && s.status !== "GRADED").length;
            return { ...assignment, ungradedCount };
          } catch (err) {
            return { ...assignment, ungradedCount: 0 };
          }
        })
      );
      setAssignments(assignmentsWithUngraded);
    } catch (err) {
      toast.error("Lỗi tải danh sách bài tập.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (record) => {
    setEditingAssignment(record);
    setTitle(record.name);
    setNote(record.note || "");
    setFile(null);
    setIsModalOpen(true);
  };

  const handleDeleted = async (record) => {
    try {
      await assignmentApi.deleteAssignment(record.id);
      toast.success("Đã xóa bài tập.");
      fetchAssignments();
    } catch (err) {
      toast.error("Xóa thất bại.");
    }
  };

  const handleAddAssignment = async () => {
    if (!title) return toast.warning("Vui lòng nhập tiêu đề.");

    const formData = new FormData();
    formData.append("name", title);
    formData.append("note", note || "");
    formData.append("courseID", courseId);
    if (file) formData.append("assignmentFile", file);

    try {
      let res;
      if (editingAssignment) {
        res = await assignmentApi.updateAssignment(editingAssignment.id, formData);
      } else {
        res = await assignmentApi.addAssignment(formData);
      }

      if (res.data) {
        toast.success(editingAssignment ? "Cập nhật bài tập thành công." : "Thêm bài tập thành công.");
        setIsModalOpen(false);
        setTitle("");
        setNote("");
        setFile(null);
        setEditingAssignment(null);
        fetchAssignments();
      }
    } catch (err) {
      toast.error("Lỗi khi thêm/cập nhật bài tập.");
    }
  };

  const columns = [
    {
      title: "📌 Tiêu đề",
      dataIndex: "name",
      key: "name",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "📌 Ghi chú",
      dataIndex: "note",
      key: "note",
    },
    {
      title: "📁 File",
      dataIndex: "fileUrl",
      key: "fileUrl",
      render: (url) => (
        <a href={url} target="_blank" rel="noopener noreferrer">
          Tải về
        </a>
      ),
    },
    {
      title: "📅 Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => (
        <span style={{ whiteSpace: "nowrap" }}>{formatDate(createdAt)}</span>
      ),
    },
    {
      title: "⚙️ Hành động",
      key: "actions",
      render: (_, record) => (
        <Space wrap>
          <Tooltip title="Cập nhật bài tập">
            <Button
              icon={<EditOutlined />}
              onClick={() => handleUpdate(record)}
              type="primary"
            >
              Cập nhật
            </Button>
          </Tooltip>

          <Tooltip title="Xem bài đã nộp">
            <Button
              icon={<TeamOutlined />}
              onClick={() => setSelectedAssignmentId(record.id)}
              type="dashed"
              style={{ backgroundColor: "#52c41a", color: "#fff" }}
            >
              Chấm bài
            </Button>
          </Tooltip>

          <Tooltip title="Xóa bài tập">
            <Button
              icon={<DeleteOutlined />}
              type="primary"
              danger
              onClick={() => handleDeleted(record)}
            >
              Xóa
            </Button>
          </Tooltip>
        </Space>
      ),
    },
    {
      title: "🛎 Cần chấm",
      dataIndex: "ungradedCount",
      key: "ungradedCount",
      render: (count) =>
        count > 0 ? (
          <Tag color="red">{count} bài chưa chấm</Tag>
        ) : (
          <Tag color="green"> Chưa có bài nộp mới </Tag>
        ),
    },
  ];

  if (selectedAssignmentId) {
    return (
      <SubmittedAssignments
        assignmentId={selectedAssignmentId}
        onBack={() => setSelectedAssignmentId(null)}
      />
    );
  }

  return (
    <Card
      title="📚 Danh sách bài tập"
      extra={
        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={() => setIsModalOpen(true)}
        >
          Thêm bài tập
        </Button>
      }
      style={{ maxWidth: 1000, margin: "auto", marginTop: 24 }}
    >
      <Table
        dataSource={assignments}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title={editingAssignment ? "✏️ Cập nhật bài tập" : "📝 Thêm bài tập mới"}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingAssignment(null);
          setTitle("");
          setNote("");
          setFile(null);
        }}
        onOk={handleAddAssignment}
        okText={editingAssignment ? "Cập nhật" : "Tạo bài tập"}
      >
        <Input
          placeholder="Nhập tiêu đề bài tập"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginBottom: 16 }}
        />

        <Input
          placeholder="Nhập ghi chú"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          style={{ marginBottom: 16 }}
        />

        <Upload
          beforeUpload={(file) => {
            setFile(file);
            return false;
          }}
          fileList={file ? [file] : []}
        >
          <Button icon={<UploadOutlined />}>Chọn file</Button>
        </Upload>
        {file && (
          <Text type="secondary" style={{ marginTop: 8, display: "block" }}>
            Đã chọn: {file.name}
          </Text>
        )}
      </Modal>
    </Card>
  );
};

export default CourseAssignments;
