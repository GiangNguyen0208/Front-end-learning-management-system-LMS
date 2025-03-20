import React from "react";
import { Typography, Row, Col, Button } from "antd";
import CourseCard from "../../components/Courses/CourseCard";

const { Title } = Typography;

const CourseSection = () => {
  const courseSection = [
    {
      id: 1,
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/4b8bbe735beffd3cbc04eb82bff6a96bb7063923171d2b2385da596c9aef29cc",
      title: "Beginner's Guide to Design",
      instructor: "Ronald Richards",
      rating: 4.9,
      ratingCount: 1200,
      details: "22 Total Hours. 155 Lectures. Beginner",
      price: 149.9,
    },
    {
        id: 1,
        imageUrl:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/4b8bbe735beffd3cbc04eb82bff6a96bb7063923171d2b2385da596c9aef29cc",
        title: "Beginner's Guide to Design",
        instructor: "Ronald Richards",
        rating: 4.9,
        ratingCount: 1200,
        details: "22 Total Hours. 155 Lectures. Beginner",
        price: 149.9,
      },
      {
        id: 1,
        imageUrl:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/4b8bbe735beffd3cbc04eb82bff6a96bb7063923171d2b2385da596c9aef29cc",
        title: "Beginner's Guide to Design",
        instructor: "Ronald Richards",
        rating: 4.9,
        ratingCount: 1200,
        details: "22 Total Hours. 155 Lectures. Beginner",
        price: 149.9,
      },
      {
        id: 1,
        imageUrl:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/4b8bbe735beffd3cbc04eb82bff6a96bb7063923171d2b2385da596c9aef29cc",
        title: "Beginner's Guide to Design",
        instructor: "Ronald Richards",
        rating: 4.9,
        ratingCount: 1200,
        details: "22 Total Hours. 155 Lectures. Beginner",
        price: 149.9,
      }
  ];

  return (
    <section className="featured-courses" style={{ marginTop: 60 }}>
      <div className="section-header">
        <Title level={2}>Top Courses</Title>
        <Button type="link">See All</Button>
      </div>
      

      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        {courseSection.map((course) => (
          <Col xs={24} sm={12} md={8} lg={6} key={course.id}>
            <CourseCard {...course} />
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default CourseSection;
