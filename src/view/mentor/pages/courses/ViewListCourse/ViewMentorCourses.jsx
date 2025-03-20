import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Card, Button, Image, Popconfirm, message, Spin, Space } from "antd";
import courseApi from "../../../../../api/courseApi";
import { URL } from "../../../../../api/constant";
import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";

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
      message.error("Không thể tải danh sách khóa học.");
    } finally {
      setLoading(false);
    }
  };

  const deleteCourse = async (courseId) => {
    try {
      const response = await courseApi.deleteCourse(courseId);
      if (response.data.success) {
        message.success("Xóa khóa học thành công!");
        setCourses((prevCourses) => prevCourses.filter((c) => c.id !== courseId));
      } else {
        message.error(response.data.responseMessage);
      }
    } catch (error) {
      message.error("Lỗi khi xóa khóa học.");
    }
  };

  const addSection = (course) => {
    navigate("/mentor/courses/section/add", { state: course });
  };

  const addCourse = () => {
    navigate("/mentor/courses/add");
  };

  const formatDateFromEpoch = (epochTime) => {
    return new Date(Number(epochTime)).toLocaleString();
  };

  const columns = [
    {
      title: "Hình ảnh",
      dataIndex: "thumbnail",
      render: (thumbnail) => (
        <Image
          src={`${URL.BASE_URL}/course/${thumbnail}`}
          width={80}
          style={{ borderRadius: 8 }}
        />
      ),
    },
    {
      title: "Tên khóa học",
      dataIndex: "name",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
    },
    {
      title: "Loại",
      dataIndex: "type",
    },
    {
      title: "Giá",
      dataIndex: "fee",
      render: (fee) => <b>{fee} VND</b>,
    },
    {
      title: "Giảm giá",
      dataIndex: "discountInPercent",
      render: (discount) => `${discount}%`,
    },
    {
      title: "Ngày thêm",
      dataIndex: "addedDateTime",
      render: (addedDateTime) => formatDateFromEpoch(addedDateTime),
    },
    {
      title: "Hành động",
      render: (text, record) => (
        <Space>
          <Button type="primary" onClick={() => addSection(record)}>
            Cập nhật
          </Button>
          <Popconfirm
            title="Bạn có chắc muốn xóa khóa học này?"
            onConfirm={() => deleteCourse(record.id)}
            okText="Có"
            cancelText="Không"
          >
            <Button danger>Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card
      title="Danh sách khóa học"
      extra={
        <Button 
          icon={<PlusOutlined />}
          type="primary" 
          onClick={addCourse}
        >
          Thêm khóa học
        </Button>
      }
      style={{ maxWidth: "1200px", margin: "auto" }}
    >
      {loading ? (
        <Spin size="large" style={{ display: "flex", justifyContent: "center" }} />
      ) : (
        <Table
          dataSource={courses}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      )}
    </Card>
  );
};

export default ViewMentorCourses;
