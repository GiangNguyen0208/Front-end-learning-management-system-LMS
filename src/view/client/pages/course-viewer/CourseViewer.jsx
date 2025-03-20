import React from 'react';
import { Layout, Typography, Card, Row, Col } from 'antd';
import CourseSection from './CourseSection';
import './styles.css';
import CourseDetails from '../course/CourseDetail/CourseDetails';
import TestimonialsSection from '../course/TestimonialSession/index';
import CourseCard from '../../components/Courses/CourseCard';
import CourseRelative from './CourseRelative';

const { Content } = Layout;
const { Title } = Typography;

const CourseViewer = () => {
  const courseData = {
    title: "Introduction to User Experience Design",
    sections: [
      {
        title: "Introduction to UX Design",
        isActive: true,
        chapters: [
          { number: "1", title: "What is UX Design?", duration: "4min", isCompleted: true },
          { number: "2", title: "Historical Overview", duration: "4min", isCompleted: true },
          { number: "3", title: "User-Centered Design", duration: "4min", isActive: true },
          { number: "4", title: "Role of UX in Products", duration: "4min", isCompleted: false },
          { number: "5", title: "UX Tools & Techniques", duration: "4min", isCompleted: false }
        ]
      },
      { title: "Basics of User-Centered Design", isActive: false, chapters: [] },
      { title: "Elements of User Experience", isActive: false, chapters: [] },
      { title: "Visual Design Principles", isActive: false, chapters: [] }
    ]
  };

  return (
    <Layout className="course-viewer">
      <Content className="course-content">
        <Title level={2} className="course-title">{courseData.title}</Title>

        {/* Sử dụng Row và Col để chia layout */}
        <Row gutter={[20, 20]}>
          {/* Cột Video */}
          <Col xs={24} md={16}>
            <div className="video-player">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/6f649cbe18fe999fa6d048972936d6c31fe727e177978293d799656d85d16b0f"
                alt="Course video"
                className="video-background"
              />
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/32961767e8b9bec5c4b4601ef945693be0f3cbaa941a27dbda2fac0376ea946d"
                alt="Play button"
                className="play-button"
              />
            </div>
            <CourseDetails courseDetail={courseData} />
          </Col>

          {/* Cột Course Progress */}
          <Col xs={24} md={8}>
            <Card className="progress-card">
              <Title level={3} className="progress-title">Course Completion</Title>
              {courseData.sections.map((section, index) => (
                <CourseSection key={index} section={section} />
              ))}
            </Card>
          </Col>
        </Row>
        <Row justify="center" gutter={[16, 16]}>
          <CourseRelative title="More Courses by Ronald Richards" />
        </Row>
      </Content>
    </Layout>
  );
};

export default CourseViewer;
