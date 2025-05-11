import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Input, Select, Button, Upload, Card, message, Spin } from "antd";
import { ArrowLeftOutlined, UploadOutlined } from "@ant-design/icons";
import categoryApi from "../../api/categoryApi";
import courseApi from "../../api/courseApi";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthProvider";

const { Option } = Select;

const EditCourseForm = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedNotesFile, setSelectedNotesFile] = useState(null);
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);

  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState({
    mentorId: user?.id || "",
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
    const fetchData = async () => {
      try {
        const [categoriesRes, courseRes] = await Promise.all([ 
          categoryApi.fetchAllCategories(),
          courseApi.getCourseById(id),
        ]);

        const catData = categoriesRes?.data?.categories || [];
        const courseData = courseRes?.data?.course;
        console.log("🚨 Course Data Edit:", courseData);
        setCategories(catData);
        if (courseData) {
          setCourse({
            mentorId: courseData.mentor.id,
            categoryId: courseData.categoryId,
            name: courseData.name,
            description: courseData.description,
            type: courseData.type,
            fee: courseData.fee,
            discountInPercent: courseData.discountInPercent,
            authorCourseNote: courseData.authorCourseNote,
            specialNote: courseData.specialNote,
            prerequisite: courseData.prerequisite,
          });
        }
      } catch (err) {
        message.error("Lỗi khi tải dữ liệu khóa học hoặc danh mục.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleInput = (name, value) => {
    setCourse((prev) => ({ ...prev, [name]: value }));
  };

  const updateCourse = async () => {
    setSubmitting(true);
    try {
      const formData = new FormData();

      // Append all non-empty course fields to formData
      Object.keys(course).forEach((key) => {
        if (course[key] !== undefined && course[key] !== null && course[key] !== "") {
          formData.append(key, course[key]);
        }
      });

      // Append selected files if they exist
      if (selectedThumbnail) formData.append("thumbnail", selectedThumbnail);
      if (selectedNotesFile) formData.append("notesFileName", selectedNotesFile);

      const res = await courseApi.updateCourse(id, formData);

      if (res?.data?.success) {
        toast.success("Cập nhật khóa học thành công!");
        navigate(`/mentor/courses/section/${id}`);
      } else {
        toast.error(res?.data?.responseMessage || "Cập nhật thất bại");
      }
    } catch (err) {
      toast.error("Đã có lỗi xảy ra khi cập nhật.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card
      title="Chỉnh sửa khóa học"
      style={{ maxWidth: "800px", margin: "auto" }}
      extra={
        <Button type="primary" icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)}>
          Trở lại
        </Button>
      }
    >
      {loading ? (
        <Spin size="large" />
      ) : (
        <Form layout="vertical" onFinish={updateCourse}>
          <Form.Item label="Tên khóa học" required>
            <Input value={course.name} onChange={(e) => handleInput("name", e.target.value)} />
          </Form.Item>

          <Form.Item label="Mô tả khóa học">
            <Input.TextArea value={course.description} onChange={(e) => handleInput("description", e.target.value)} />
          </Form.Item>

          <Form.Item label="Danh mục khóa học" required>
            <Select value={course.categoryId} onChange={(value) => handleInput("categoryId", value)} placeholder="Chọn danh mục">
              {categories.map((cat) => (
                <Option key={cat.id} value={cat.id}>
                  {cat.name}
                </Option>
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
              <Button icon={<UploadOutlined />}>Tải lại tài liệu (tùy chọn)</Button>
            </Upload>
          </Form.Item>

          <Form.Item label="Hình thu nhỏ">
            <Upload beforeUpload={(file) => { setSelectedThumbnail(file); return false; }}>
              <Button icon={<UploadOutlined />}>Tải lại hình ảnh (tùy chọn)</Button>
            </Upload>
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={submitting} block>
            {submitting ? "Đang xử lý..." : "Cập nhật khóa học"}
          </Button>
        </Form>
      )}
    </Card>
  );
};

export default EditCourseForm;
