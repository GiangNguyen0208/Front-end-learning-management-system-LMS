import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Card, Typography, Rate, Space } from "antd";

const { Title, Text } = Typography;

const CourseCard = ({ imageUrl, title, instructor, rating, ratingCount, details, price }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/course"); // Điều hướng đến trang khóa học
  };

  return (
    <Card
      hoverable
      onClick={handleNavigate}
      cover={<img alt={title} src={imageUrl} style={{ borderRadius: "8px 8px 0 0" }} />}
      className="course-card"
    >
      <Space direction="vertical" size={8} style={{ width: "100%" }}>
        <Title level={4}>{title}</Title>
        <Text type="secondary">By {instructor}</Text>

        <Space>
          <Rate disabled defaultValue={rating} />
          <Text type="secondary">({ratingCount} Ratings)</Text>
        </Space>

        <Text type="secondary">{details}</Text>
        <Title level={4}>${price}</Title>
      </Space>
    </Card>
  );
};

// Định nghĩa kiểu dữ liệu của props bằng PropTypes
CourseCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  instructor: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  ratingCount: PropTypes.number.isRequired,
  details: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default CourseCard;
