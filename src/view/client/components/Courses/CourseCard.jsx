import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Card, Typography, Rate, Space, Row, Col, Tag } from "antd";
import { DollarCircleOutlined, UserOutlined } from "@ant-design/icons";
import { URL } from "../../../../api/constant";
const { Title, Text } = Typography;

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  if (!course) {
    return <p>Đang tải khóa học...</p>;
  }

  const handleNavigate = () => {
    navigate(`/course-details/${course.id}`, { state: { course } });
  };

  return (
    <Card
      hoverable
      onClick={handleNavigate}
      cover={<img alt={course.name} src={`${URL.BASE_URL}/course/${course.thumbnail}`} />}
      style={{ width: 300 }}
    >
      <Title level={4}>{course.name}</Title>
      <Text type="secondary">{course.category?.name}</Text>
      <p>{course.description}</p>

      <Row justify="space-between">
        <Col>
          {course.type === "free" ? (
            <Tag color="green">Miễn phí</Tag>
          ) : (
            <Tag icon={<DollarCircleOutlined />} color="blue">
              ${course.fee}
            </Tag>
          )}
        </Col>
        <Col>
          <Tag icon={<UserOutlined />} color="purple">
            {course.mentor?.name}
          </Tag>
        </Col>
      </Row>
    </Card>
  );
};

// Định nghĩa kiểu dữ liệu của props bằng PropTypes
CourseCard.propTypes = {
  course: PropTypes.shape({
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    instructor: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    ratingCount: PropTypes.number.isRequired,
    details: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default CourseCard;
