import React from "react";
import { Typography } from "antd";
import PropTypes from "prop-types";

const { Title, Text } = Typography;

function MentorHeader({ name, title, students, reviews }) {
  return (
    <div className="mentor-header">
      <div>
        <Text className="instructor-label">Instructor</Text>
        <div className="mentor-name-container">
          <Title level={2} className="mentor-name">
            {name}
          </Title>
          <Text className="mentor-title">{title}</Text>
        </div>
      </div>
      <div className="mentor-stats">
        <div className="stat-item">
          <Text className="stat-label">Total Students</Text>
          <Title level={3} className="stat-value">
            {students}
          </Title>
        </div>
        <div className="stat-item">
          <Text className="stat-label">Reviews</Text>
          <Title level={3} className="stat-value">
            {reviews}
          </Title>
        </div>
      </div>
    </div>
  );
}

MentorHeader.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  students: PropTypes.number.isRequired,
  reviews: PropTypes.number.isRequired,
};

export default MentorHeader;
