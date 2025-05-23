import React, { useState, useEffect } from "react";
import { Typography, Row, Col, Button, Spin } from "antd";
import CourseCard from "../../components/Courses/CourseCard";
import courseApi from "../../../../api/courseApi";
import { useNavigate } from "react-router-dom";
import { RightOutlined } from "@ant-design/icons";

const { Title } = Typography;

const CourseSection = () => {
  const [courseSection, setCourseSection] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await courseApi.getCoursesByStatus("Active", "No");
        setCourseSection(response.data.courseDTOs || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Chỉ lấy 4 phần tử đầu
  const displayedCourses = courseSection.slice(0, 4);

  return (
    <section className="featured-courses" style={{ marginTop: 60 }}>
      <div
        className="section-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <Title level={2} style={{ margin: 0 }}>Khóa học</Title>
        {courseSection.length > 4 && (
          <Button
            type="primary"
            ghost
            onClick={() => navigate("/categories")}
            icon={<RightOutlined />}
            style={{ fontWeight: "bold" }}
          >
            Xem tất cả
          </Button>
        )}
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <Spin size="large" />
        </div>
      ) : Array.isArray(courseSection) && courseSection.length > 0 ? (
        <>
          <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
            {displayedCourses.map((course) => (
              <Col xs={24} sm={12} md={8} lg={6} key={course.id}>
                <CourseCard course={course} />
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <p>Không tìm thấy khóa học nào.</p>
      )}
    </section>
  );
};

export default CourseSection;
