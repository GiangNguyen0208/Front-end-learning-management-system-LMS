import React from 'react';
import { Layout, Typography, Row, Col } from 'antd';
import CourseFilters from './CourseFilters';
import CourseGrid from './CourseGrid';
import './styles.css'
import InstructorSection from './../../components/Instructor/InstructorSection';
import CourseSection from '../../components/Courses/CourseSection';

const { Title } = Typography;

const Categories = () => {
  const courses = [
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
    },{
      id: 1,
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/4b8bbe735beffd3cbc04eb82bff6a96bb7063923171d2b2385da596c9aef29cc",
      title: "Beginner's Guide to Design",
      instructor: "Ronald Richards",
      rating: 4.9,
      ratingCount: 1200,
      details: "22 Total Hours. 155 Lectures. Beginner",
      price: 149.9,
    },{
      id: 1,
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/4b8bbe735beffd3cbc04eb82bff6a96bb7063923171d2b2385da596c9aef29cc",
      title: "Beginner's Guide to Design",
      instructor: "Ronald Richards",
      rating: 4.9,
      ratingCount: 1200,
      details: "22 Total Hours. 155 Lectures. Beginner",
      price: 149.9,
    },{
      id: 1,
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/4b8bbe735beffd3cbc04eb82bff6a96bb7063923171d2b2385da596c9aef29cc",
      title: "Beginner's Guide to Design",
      instructor: "Ronald Richards",
      rating: 4.9,
      ratingCount: 1200,
      details: "22 Total Hours. 155 Lectures. Beginner",
      price: 149.9,
    },{
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
  ];

  return (
    <Layout.Content className="course-list-container" style={{ maxWidth: 1280, margin: '0 auto', padding: '24px' }}>
      <Title level={1}>Khóa học</Title>

      <div className="course-section">
        <Title level={2}>All Development Courses</Title>

        <Row gutter={[24, 24]}>
          <Col xs={24} lg={6}>
            <CourseFilters />
          </Col>
          <Col xs={24} lg={18}>
            <CourseGrid courses={courses} />
          </Col>
        </Row>
      </div>

      <InstructorSection />
      <CourseSection />
    </Layout.Content>
  );
};

export default Categories;
