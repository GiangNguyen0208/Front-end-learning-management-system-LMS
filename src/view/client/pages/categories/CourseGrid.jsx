import React from "react";
import { Row, Col } from "antd";
import CourseCard from "../../components/Courses/CourseCard";
import Pagination from "../../../../components/Pagination/Pagination";

const CourseGrid = ({ courses }) => {
  return (
    <div className="course-grid">
      <Pagination
        items={courses}
        itemsPerPage={6}
        renderItem={(course, index) => (
          <Col xs={24} sm={12} lg={8} key={course.id || index}>
            <CourseCard course={course} />
          </Col>
        )}
        wrapper={(children) => (
          <Row gutter={[24, 24]}>
            {children}
          </Row>
        )}
      />
    </div>
  );
};

export default CourseGrid;
