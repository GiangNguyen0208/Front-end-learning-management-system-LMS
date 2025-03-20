import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Select, Button, Upload, Card, message, Spin } from "antd";
import { ArrowLeftOutlined, UploadOutlined } from "@ant-design/icons";
import categoryApi from "../../api/categoryApi";
import axios from "axios";
import courseApi from "../../api/courseApi";

const { Option } = Select;

const AddCourseForm = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const mentor = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [selectedNotesFile, setSelectedNotesFile] = useState(null);
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);
  const [course, setCourse] = useState({
    mentorId: mentor.id,
    categoryId: "",
    name: "",
    description: "",
    type: "Paid",
    fee: 0.0,
    discountInPercent: 0,
    authorCourseNote: "",
    specialNote: "",
    prerequisite: "",
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await categoryApi.fetchAllCategories();
      console.log("Categories", response.data);
      
      setCategories(Array.isArray(response.data.categories) ? response.data.categories : []);
    } catch (error) {
      message.error("Không thể lấy danh mục khóa học.");
    } finally {
      setLoading(false);
    }
  };

  const handleInput = (name, value) => {
    setCourse((prev) => ({ ...prev, [name]: value }));
  };

  const saveCourse = async () => {
    if (!course.name || !course.categoryId) {
      message.error("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    setSubmitting(true);
    const formData = new FormData();
    Object.keys(course).forEach((key) => {
      formData.append(key, course[key]);
    });
    formData.append("thumbnail", selectedThumbnail);
    formData.append("notesFileName", selectedNotesFile);

    try {
      const response = await courseApi.addCourse(formData);
      if (response.data.success) {
        message.success("Thêm khóa học thành công!");
        setTimeout(() => {
          navigate("/mentor/courses/section/add", { state: response.data.course });
        }, 1500);
      } else {
        message.error(response.data.responseMessage);
      }
    } catch (error) {
      message.error("Lỗi máy chủ, vui lòng thử lại sau.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };
  
  return (
    <Card 
      title="Thêm khóa học" 
      style={{ maxWidth: "800px", margin: "auto" }}
      extra={
        <Button type="primary" icon={<ArrowLeftOutlined />} onClick={handleGoBack} style={{ marginBottom: 16, marginLeft: 16 }}>
            Go Back
        </Button>
      }
    >
      {loading ? (
        <Spin size="large" />
      ) : (
        <Form layout="vertical" onFinish={saveCourse}>
          <Form.Item label="Tên khóa học" required>
            <Input value={course.name} onChange={(e) => handleInput("name", e.target.value)} />
          </Form.Item>

          <Form.Item label="Mô tả khóa học">
            <Input.TextArea value={course.description} onChange={(e) => handleInput("description", e.target.value)} />
          </Form.Item>

          <Form.Item label="Danh mục khóa học" required>
            <Select onChange={(value) => handleInput("categoryId", value)} placeholder="Chọn danh mục">
              {categories.map((category) => (
                <Option key={category.id} value={category.id}>{category.name}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Loại khóa học">
            <Select value={course.type} onChange={(value) => handleInput("type", value)}>
              <Option value="Paid">Có phí</Option>
              <Option value="Free">Miễn phí</Option>
            </Select>
          </Form.Item>

          {course.type === "Paid" && (
            <>
              <Form.Item label="Học phí">
                <Input type="number" value={course.fee} onChange={(e) => handleInput("fee", e.target.value)} />
              </Form.Item>
              <Form.Item label="Giảm giá (%)">
                <Input type="number" value={course.discountInPercent} onChange={(e) => handleInput("discountInPercent", e.target.value)} />
              </Form.Item>
            </>
          )}

          <Form.Item label="Ghi chú của tác giả">
            <Input.TextArea value={course.authorCourseNote} onChange={(e) => handleInput("authorCourseNote", e.target.value)} />
          </Form.Item>

          <Form.Item label="Ghi chú đặc biệt">
            <Input.TextArea value={course.specialNote} onChange={(e) => handleInput("specialNote", e.target.value)} />
          </Form.Item>

          <Form.Item label="Yêu cầu trước khi học">
            <Input.TextArea value={course.prerequisite} onChange={(e) => handleInput("prerequisite", e.target.value)} />
          </Form.Item>

          <Form.Item label="Tài liệu khóa học">
            <Upload beforeUpload={(file) => { setSelectedNotesFile(file); return false; }}>
              <Button icon={<UploadOutlined />}>Tải lên tài liệu</Button>
            </Upload>
          </Form.Item>

          <Form.Item label="Hình thu nhỏ">
            <Upload beforeUpload={(file) => { setSelectedThumbnail(file); return false; }}>
              <Button icon={<UploadOutlined />}>Tải lên hình ảnh</Button>
            </Upload>
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={submitting} block>
            {submitting ? "Đang xử lý..." : "Thêm khóa học"}
          </Button>
        </Form>
      )}
    </Card>
  );
};

export default AddCourseForm;
