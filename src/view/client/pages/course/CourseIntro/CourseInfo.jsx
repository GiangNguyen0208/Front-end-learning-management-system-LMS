import React from "react";
import { Typography } from "antd";

const { Title, Paragraph } = Typography;

const CourseInfo = ({course}) => {
  return (
    <div className="course-info">
      <Title level={1} className="course-title">
        {course.name}
      </Title>
      <Paragraph className="course-description">
        {course.description}
      </Paragraph>
    </div>
  );
};

export default CourseInfo;
