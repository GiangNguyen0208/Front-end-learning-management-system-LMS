import React, { useState, useEffect } from "react";
import { Button, Input, List, message, Rate, Card, Avatar, Typography, Modal } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import ratingApi from "../../../../api/ratingApi"; 
import {
  ReviewsSection,
  ReviewItem,
  ReviewerInfo,
  ReviewContent,
} from "./js/styles";

const { Text } = Typography;
const { TextArea } = Input;

const CourseRatingForm = ({ user }) => {
  const { id } = useParams();
  const courseId = Number(id);
  const [ratings, setRatings] = useState([]);
  const [ratingText, setRatingText] = useState("");
  const [ratingValue, setRatingValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchRatings();
  }, []);

  const fetchRatings = async () => {
    try {
      const response = await ratingApi.getRatingsByCourse(courseId);
      setRatings(response.data);
    } catch (error) {
      console.error("Lỗi khi tải đánh giá:", error);
    }
  };

  const showConfirmModal = () => {
    if (!ratingText.trim()) {
      message.warning("Vui lòng nhập nội dung đánh giá!");
      return;
    }
    if (ratingValue === 0) {
      message.warning("Vui lòng chọn số sao đánh giá!");
      return;
    }
    setIsModalVisible(true);
  };

  const handleRatingSubmit = async () => {
    setLoading(true);
    setIsModalVisible(false);
    try {
      const response = await ratingApi.addRating({
        userId: user.id,
        courseId: courseId,
        rating: ratingValue,
        comment: ratingText,
      });
  
      if (response.data.isSuccess) {
        message.success("Đánh giá đã được gửi!");
        setRatingText("");
        setRatingValue(0);
  
        // Gọi API để lấy danh sách mới
        const updatedRatings = await ratingApi.getRatingsByCourse(courseId);
        setRatings([...updatedRatings.data]); // Cập nhật state để React re-render
      } else {
        message.error("Không thể gửi đánh giá!");
      }
    } catch (error) {
      console.error("Lỗi khi gửi đánh giá:", error);
      message.error("Có lỗi xảy ra!");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateArray) => {
    if (!dateArray || dateArray.length < 3) return "Invalid date";
    const date = new Date(...dateArray); 
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };
  

  return (
    <ReviewsSection>
      <h3>Đánh giá khóa học</h3>
      <Card className="rating-card">
        <Rate
          allowHalf
          value={ratingValue}
          onChange={setRatingValue}
          className="rate-stars"
        />
        <TextArea
          rows={4}
          value={ratingText}
          onChange={(e) => setRatingText(e.target.value)}
          placeholder="Nhập bình luận của bạn..."
          className="rating-textarea"
        />
        <Button
          type="primary"
          onClick={showConfirmModal}
          loading={loading}
          className="rating-submit-btn"
        >
          Gửi đánh giá
        </Button>
      </Card>

      <List
        dataSource={ratings}
        renderItem={(rating) => (
          <ReviewItem>
            <ReviewerInfo>
              <Avatar size={60} src={rating.avatar || ""} icon={!rating.avatar && <UserOutlined />} />
              <span>{rating.firstName + " " + rating.lastName}</span>
              <span>{rating.role}</span>
            </ReviewerInfo>
            <ReviewContent>
              <div>
                <Rate disabled value={rating.rating} />
                <Text type="secondary" style={{ marginLeft: 8 }}>
                  Ngày đánh giá {formatDate(rating.createdAt)}
                </Text>
              </div>
              <p>{rating.comment}</p>
            </ReviewContent>
          </ReviewItem>
        )}
      />

      <Modal
        title="Xác nhận đánh giá"
        visible={isModalVisible}
        onOk={handleRatingSubmit}
        onCancel={() => setIsModalVisible(false)}
        confirmLoading={loading}
      >
        <p>Bạn có chắc chắn muốn gửi đánh giá này không?</p>
      </Modal>
    </ReviewsSection>
  );
};

export default CourseRatingForm;
