import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  Card,
  Button,
  Image,
  Popconfirm,
  message,
  Space,
  Skeleton,
  Tooltip,
  Typography
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  TeamOutlined,
  FileTextOutlined
} from "@ant-design/icons";
import courseApi from "../../../../../api/courseApi";
import { URL } from "../../../../../api/constant";
import { toast } from "react-toastify";

const { Paragraph } = Typography;

const ViewMentorCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const mentor = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await courseApi.getCoursesByMentor(mentor.id);
      setCourses(response.data.courses || []);
    } catch (error) {
      toast.error("Không thể tải danh sách khóa học.");
    } finally {
      setLoading(false);
    }
  };

  const addSection = (course) => {
    navigate(`/mentor/courses/section/${course.id}`);
  };

  const addCourse = () => {
    navigate("/mentor/courses/add");
  };

  const formatDateFromEpoch = (epochTime) =>
    new Date(Number(epochTime)).toLocaleString();

    const viewStudents = async (course) => {
        navigate(`/mentor/courses/assignments/${course.id}`, {
          state: { courseId: course.id },
        });
    };

  const viewAssignments = async (course) => {
    navigate(`/mentor/courses/assignments/${course.id}`, {
      state: {
        courseId: course.id,
      },
    });
  };

  const columns = [
    {
      title: (
        <div style={{ whiteSpace: "nowrap", fontWeight: 600 }}>📷 Hình ảnh</div>
      ),
      dataIndex: "thumbnail",
      width: 100,
      render: (thumbnail) => (
        <Image
          src={`${URL.BASE_URL}/course/${thumbnail}`}
          width={80}
          style={{ borderRadius: 8 }}
        />
      ),
    },
    {
      title: (
        <div style={{ whiteSpace: "nowrap", fontWeight: 600 }}>📘 Tên khóa học</div>
      ),
      dataIndex: "name",
      width: 200,
      ellipsis: true,
      render: (text) => (
        <span style={{ whiteSpace: "nowrap", fontWeight: 500 }}>{text}</span>
      ),
    },
    {
      title: <div style={{ whiteSpace: "nowrap", fontWeight: 600 }}>📄 Mô tả</div>,
      dataIndex: "description",
      ellipsis: true,
      render: (text) => (
        <span style={{ whiteSpace: "nowrap", color: "#595959" }}>{text}</span>
      ),
    },
    {
      title: <div style={{ whiteSpace: "nowrap", fontWeight: 600 }}>📂 Loại</div>,
      dataIndex: "type",
      width: 100,
      ellipsis: true,
    },
    {
      title: <div style={{ whiteSpace: "nowrap", fontWeight: 600 }}>💰 Giá</div>,
      dataIndex: "fee",
      width: 100,
      render: (fee) => (
        <span style={{ whiteSpace: "nowrap", fontWeight: 600 }}>{fee} VND</span>
      ),
    },
    {
      title: (
        <div style={{ whiteSpace: "nowrap", fontWeight: 600 }}>
          🔖 Giảm giá
        </div>
      ),
      dataIndex: "discountInPercent",
      width: 100,
      render: (discount) => (
        <span style={{ whiteSpace: "nowrap", color: "#cf1322" }}>{discount}%</span>
      ),
    },
    {
      title: (
        <div style={{ whiteSpace: "nowrap", fontWeight: 600 }}>
          📅 Ngày thêm
        </div>
      ),
      dataIndex: "addedDateTime",
      width: 150,
      render: (addedDateTime) => (
        <span style={{ whiteSpace: "nowrap" }}>
          {formatDateFromEpoch(addedDateTime)}
        </span>
      ),
    },
    {
      title: (
        <div style={{ whiteSpace: "nowrap", fontWeight: 600 }}>
          ⚙️ Hành động
        </div>
      ),
      render: (_, record) => (
        <Space wrap>
          <Tooltip title="Cập nhật khóa học">
            <Button
              icon={<EditOutlined />}
              onClick={() => addSection(record)}
              type="primary"
            >
              Cập nhật
            </Button>
          </Tooltip>

          <Tooltip title="Danh sách học viên">
            <Button
              icon={<TeamOutlined />}
              style={{ backgroundColor: "#722ed1", borderColor: "#722ed1" }}
              type="primary"
              onClick={() => viewStudents(record)}
            >
              Học viên
            </Button>
          </Tooltip>

          <Tooltip title="Xem danh sách bài tập">
            <Button
              icon={<FileTextOutlined />}
              type="primary"
              ghost
              onClick={() => viewAssignments(record)}
              style={{ backgroundColor: "#52c41a", color: "#fff" }}
            >
              Bài tập
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];
  

  return (
    <Card
      title="🎓 Danh sách khóa học của bạn"
      extra={
        <Button
          icon={<PlusOutlined />}
          type="primary"
          size="middle"
          style={{
            backgroundColor: "#1890ff",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
          }}
          onClick={addCourse}
        >
          Thêm khóa học
        </Button>
      }
      style={{
        maxWidth: "1300px",
        margin: "auto",
        marginTop: 30,
        borderRadius: 12,
        border: "1px solid #d9d9d9",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      }}
    >
      {loading ? (
        <Skeleton active paragraph={{ rows: 8 }} />
      ) : (
        <Table
          dataSource={courses}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          bordered
          style={{ borderRadius: 8 }}
        />
      )}
    </Card>
  );
};

export default ViewMentorCourses;
