import { useState, useEffect } from "react";
import { Card, Avatar, Typography, Spin, Button } from "antd";
import { Link } from "react-router-dom";
import courseApi from "../../api/courseApi";
import { URL } from "../../api/constant";

const { Title, Paragraph } = Typography;

const CourseDetails = ({ courseId }) => {
  const [courseDetail, setCourseDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!courseId) {
      setLoading(false);
      return;
    }

    const fetchCourse = async () => {
      try {
        const response = await courseApi.getCourseById(courseId);
        if (response?.data?.course) {
          setCourseDetail(response.data.course);
        } else {
          console.error("🚨 Lỗi: Không tìm thấy dữ liệu khóa học!");
        }
      } catch (error) {
        console.error("❌ Lỗi khi lấy dữ liệu khóa học:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  if (loading) {
    return <Spin size="large" />;
  }

  if (!courseDetail) {
    return <Paragraph>⚠ Không có dữ liệu khóa học.</Paragraph>;
  }

  

  return (
    <Card className="mb-4">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Title level={2} style={{ margin: 0 }}>{courseDetail?.name}</Title>
        <Link to={`/mentor/course/${courseDetail?.id}/edit`}>
          <Button type="primary">Sửa thông tin</Button>
        </Link>
      </div>
      <Paragraph>{courseDetail?.description}</Paragraph>

      <Title level={3}>Tác giả</Title>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Avatar
          src={`${URL.BASE_URL}/user/${courseDetail?.mentor?.mentorDetail?.profilePic}`}
          size={64}
        />
        <div style={{ marginLeft: "10px" }}>
          <Link to={`/mentor/${courseDetail?.mentor?.id}/course/all`}>
            <Title level={5} style={{ margin: 0 }}>
              {`${courseDetail?.mentor?.firstName} ${courseDetail?.mentor?.lastName} [${courseDetail?.mentor?.mentorDetail?.profession}]`}
            </Title>
          </Link>
        </div>
      </div>

      <Title level={3} className="mt-3">Yêu cầu trước khi học</Title>
      {courseDetail?.prerequisite ? (
        courseDetail.prerequisite.split("~").map((item, index) => (
          <Paragraph key={index}>- {item}</Paragraph>
        ))
      ) : (
        <Paragraph>Không có yêu cầu.</Paragraph>
      )}

      {courseDetail?.specialNote && (
        <Paragraph type="danger">
          <strong>Lưu ý:</strong> {courseDetail.specialNote}
        </Paragraph>
      )}
    </Card>
  );
};

export default CourseDetails;
