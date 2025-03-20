import { useState, useEffect } from "react";
import { Card, Avatar, Typography, Spin } from "antd";
import { Link, useParams } from "react-router-dom";
import courseApi from "../../api/courseApi";
import { URL } from "../../api/constant";

const { Title, Paragraph } = Typography;

const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await courseApi.getCourseById(courseId);
        setCourse(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu khóa học:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [courseId]);

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <Card className="mb-4">
      <Title level={2}>{course.name}</Title>
      <Paragraph>{course.description}</Paragraph>

      <Title level={3}>Tác giả</Title>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Avatar
          src={`${URL.BASE_URL}/user/${course.mentor.mentorDetail.profilePic}`}
          size={64}
        />
        <div style={{ marginLeft: "10px" }}>
          <Link to={`/mentor/${course.mentor.id}/course/all`}>
            <Title level={5} style={{ margin: 0 }}>
              {`${course.mentor.firstName} ${course.mentor.lastName} [${course.mentor.mentorDetail.profession}]`}
            </Title>
          </Link>
        </div>
      </div>

      <Title level={3} className="mt-3">Yêu cầu trước khi học</Title>
      {course.prerequisite ? (
        course.prerequisite.split("~").map((item, index) => (
          <Paragraph key={index}>- {item}</Paragraph>
        ))
      ) : (
        <Paragraph>Không có yêu cầu.</Paragraph>
      )}

      {course.specialNote && (
        <Paragraph type="danger">
          <strong>Lưu ý:</strong> {course.specialNote}
        </Paragraph>
      )}
    </Card>
  );
};

export default CourseDetails;
