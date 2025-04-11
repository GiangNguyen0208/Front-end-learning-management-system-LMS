import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Card, Typography, Rate, Space, Row, Col, Tag } from "antd";
import { DollarCircleOutlined, UserOutlined, StarFilled } from "@ant-design/icons";
import { URL } from "../../../../api/constant";
import { formatFeeToVND } from "../../../../utils/helper/formatFeeToVND";

const { Title, Text, Paragraph } = Typography;

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  if (!course) {
    return <p>Đang tải khóa học...</p>;
  }

  const handleNavigate = () => {
    navigate(`/course-details/${course.id}`, { state: { course } });
  };

  // Hàm cắt ngắn mô tả nếu quá dài
  const truncateDescription = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
  };

  return (
    <Card
      hoverable
      onClick={handleNavigate}
      cover={
        <img 
          alt={course.name} 
          src={`${URL.BASE_URL}/course/${course.thumbnail}`}
          style={{ 
            height: 160,
            objectFit: "cover"
          }}
        />
      }
      style={{ 
        width: 300,
        height: 420, // Chiều cao cố định
        display: "flex",
        flexDirection: "column"
      }}
      bodyStyle={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        padding: 16
      }}
    >
      <div style={{ flex: 1 }}>
        <Title 
          level={4} 
          ellipsis={{ rows: 2 }} 
          style={{ 
            marginBottom: 8,
            minHeight: 56 // Đảm bảo tiêu đề luôn chiếm 2 dòng
          }}
        >
          {course.name}
        </Title>
        
        <Text type="secondary" style={{ display: "block", marginBottom: 8 }}>
          {course.category?.name}
        </Text>
        
        <Paragraph 
          ellipsis={{ rows: 3 }} 
          style={{ 
            marginBottom: 12,
            color: "#666",
            minHeight: 72 // Đảm bảo mô tả chiếm 3 dòng
          }}
        >
          {course.description}
        </Paragraph>
      </div>

      <div>
        <Space size={4} style={{ marginBottom: 8 }}>
          <Rate 
            disabled 
            value={course.averageRating || 0} 
            character={<StarFilled />}
            style={{ fontSize: 14 }}
          />
          <Text type="secondary">({course.ratingCount || 0})</Text>
        </Space>
        
        <Row justify="space-between" align="middle">
          <Col>
            {course.type === "free" ? (
              <Tag color="green" style={{ margin: 0 }}>MIỄN PHÍ</Tag>
            ) : (
              <Tag 
                icon={<DollarCircleOutlined />} 
                color="blue"
                style={{ margin: 0 }}
              >
                {formatFeeToVND(course.fee)}
              </Tag>
            )}
          </Col>
          <Col>
            <Tag 
              icon={<UserOutlined />} 
              color="purple"
              style={{ margin: 0 }}
            >
              {course.mentor?.name || "Giảng viên"}
            </Tag>
          </Col>
        </Row>
      </div>
    </Card>
  );
};

CourseCard.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    thumbnail: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.shape({
      name: PropTypes.string
    }),
    type: PropTypes.string,
    fee: PropTypes.number,
    mentor: PropTypes.shape({
      name: PropTypes.string
    }),
    averageRating: PropTypes.number,
    ratingCount: PropTypes.number
  })
};

export default CourseCard;