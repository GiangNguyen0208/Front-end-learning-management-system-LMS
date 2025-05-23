import React from "react";
import { Card, Typography, Divider } from "antd";
import "./css/InstructorCard.css";
import { URL } from "../../../../../api/constant";

const { Title, Text } = Typography;

const InstructorCard = ({ avatar, name, role, students }) => {
  return (
    <Card className="instructor-card" hoverable>
      <div className="instructor-image-container">
        <img
          src={`${URL.BASE_URL}/user/${avatar}`}
          alt={name}
          className="instructor-image"
        />
      </div>

      <div className="instructor-info">
        <Title level={5} className="instructor-name">
          {name}
        </Title>
        <Text className="instructor-title">{role}</Text>
        {students !== undefined && (
          <Text type="secondary" className="instructor-students">
            👨‍🎓 {students} học viên
          </Text>
        )}
      </div>

      <Divider className="instructor-divider" />
    </Card>
  );
};

export default InstructorCard;
