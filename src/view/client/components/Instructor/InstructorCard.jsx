import React from "react";
import { Card, Avatar, Typography, Rate, Divider } from "antd";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { URL } from "../../../../api/constant";

const { Title, Text } = Typography;

const InstructorCard = ({ mentor, avatar, name, role, rating, students }) => {
  const navigate = useNavigate(); 

  const handleNavigate = () => {
    navigate(`/instructor-info/${mentor.mentorDetail.id}`, { state: { mentor } });
  };

  return (
        <Card 
          className="instructor-card" 
          hoverable
          onClick={handleNavigate}
        >
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
  )
};

export default InstructorCard;
