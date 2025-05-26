import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Typography,
  Rate,
  Space,
  Row,
  Col,
  Tag,
  Progress,
  Button,
  Divider,
} from "antd";
import {
  UserOutlined,
  CheckCircleOutlined,
  StarFilled,
} from "@ant-design/icons";
import { URL } from "../../../../../api/constant";
import courseApi from "../../../../../api/courseApi";

const { Title, Text, Paragraph } = Typography;

const MyCourseCard = ({ courseBooking }) => {
  const navigate = useNavigate();
  const [courseProgress, setCourseProgress] = useState(0);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user?.id && courseBooking?.course?.id) {
          const response = await courseApi.getCourseProgress(
            user.id,
            courseBooking.course.id
          );
          setCourseProgress(response.data);
        }
      } catch (error) {
        console.error("❌ Lỗi lấy tiến độ khóa học:", error);
      }
    };

    fetchProgress();
  }, [courseBooking]);

  const handleGoToLearning = () => {
    navigate(`/my-learning/${courseBooking.course.id}/learn`, {
      state: { courseBooking },
    });
  };

  const handleGoToAssigment = () => {
    navigate(`/my-assignment/${courseBooking.course.id}/learn`, {
      state: { courseBooking },
    });
  };

  const truncateDescription = (text, maxLength = 100) => {
    if (!text) return "";
    return text.length <= maxLength ? text : `${text.substring(0, maxLength)}...`;
  };

  const { course } = courseBooking || {};
  const isCompleted = (courseProgress || courseBooking.progress) === 100;

  if (!course) return <p>Đang tải khoá học...</p>;

  return (
    <Card
      hoverable
      style={{
        width: "100%",
        maxWidth: 340,
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.06)",
      }}
      bodyStyle={{ padding: 16 }}
      cover={
        <div style={{ position: "relative" }}>
          <img
            src={`${URL.BASE_URL}/course/${course.thumbnail}`}
            alt={course.name}
            style={{
              height: 180,
              objectFit: "cover",
              width: "100%",
            }}
          />
          {isCompleted && (
            <Tag
              color="green"
              style={{
                position: "absolute",
                top: 12,
                left: 12,
                fontWeight: 600,
              }}
            >
              🏁 Đã hoàn thành
            </Tag>
          )}
        </div>
      }
    >
      <Title level={4} ellipsis={{ rows: 2 }} style={{ marginBottom: 8 }}>
        {course.name}
      </Title>

      <Text type="secondary" style={{ display: "block", marginBottom: 8 }}>
        {course.category?.name || "Danh mục"}
      </Text>

      <Paragraph
        ellipsis={{ rows: 3 }}
        style={{ marginBottom: 12, color: "#666" }}
      >
        {truncateDescription(course.description)}
      </Paragraph>

      {/* Trạng thái đăng ký */}
      <Space style={{ marginBottom: 12 }}>
        {courseBooking.status === "SUCCESS" && (
          <Tag icon={<CheckCircleOutlined />} color="success">
            Đã xác nhận
          </Tag>
        )}
        {courseBooking.status === "PENDING" && (
          <Tag color="warning">Chờ xác nhận</Tag>
        )}
        {courseBooking.status === "CANCELLED" && (
          <Tag color="red">Đã huỷ</Tag>
        )}
      </Space>

      {/* Tiến độ */}
      <Text type="secondary">Tiến độ hoàn thành</Text>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <Progress
          percent={courseProgress || courseBooking.progress || 0}
          size="small"
          strokeColor={{ from: "#108ee9", to: "#87d068" }}
          style={{ flex: 1 }}
        />
        <span style={{ marginLeft: 8, fontWeight: 500 }}>
          {courseProgress || courseBooking.progress || 0}%
        </span>
      </div>

      <Divider style={{ margin: "8px 0" }} />

      {/* Footer Info */}
      <Row justify="space-between" align="middle" style={{ marginBottom: 12 }}>
        <Col>
          <Rate
            disabled
            allowHalf
            value={course.averageRating || 0}
            character={<StarFilled />}
            style={{ fontSize: 14, color: "#faad14" }}
          />
          <Text type="secondary" style={{ marginLeft: 4 }}>
            ({course.ratingCount || 0})
          </Text>
        </Col>
        <Col>
          <Tag icon={<UserOutlined />} color="purple">
            Giảng viên:{" "}
            {course.mentor?.lastName + " " + course.mentor?.firstName ||
              "Không rõ"}
          </Tag>
        </Col>
      </Row>

      {/* Nút hành động */}
      <Row gutter={8}>
        <Col span={12}>
          <Button
            block
            type="primary"
            onClick={(e) => {
              e.stopPropagation();
              handleGoToLearning();
            }}
          >
            Học tiếp
          </Button>
        </Col>
        <Col span={12}>
          <Button
            block
            onClick={(e) => {
              e.stopPropagation();
              handleGoToAssigment();
            }}
          >
            Làm bài tập
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

MyCourseCard.propTypes = {
  courseBooking: PropTypes.shape({
    status: PropTypes.oneOf(["SUCCESS", "PENDING", "CANCELLED"]),
    progress: PropTypes.number,
    course: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      thumbnail: PropTypes.string,
      description: PropTypes.string,
      category: PropTypes.shape({ name: PropTypes.string }),
      mentor: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
      }),
      averageRating: PropTypes.number,
      ratingCount: PropTypes.number,
    }),
  }),
};

export default MyCourseCard;
