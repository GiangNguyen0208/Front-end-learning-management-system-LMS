import React from "react";
import { Avatar, Card, Rate, Typography, Button } from "antd";
import styled from "styled-components";
import { UserOutlined } from "@ant-design/icons";
import { ReviewDate } from "../../course/js/styles";
import { formatDate } from "../../../../../utils/helper/formatDate";
import { useNavigate } from "react-router-dom";
import Pagination from "../../../components/Pagination/Pagination";

const { Text, Title } = Typography;

const ReviewCard = ({ review }) => {
  const navigate = useNavigate(); // Dùng để điều hướng đến trang chi tiết review

  const handleViewDetails = (courseId) => {
    navigate(`/course-details/${courseId}`); // Điều hướng đến trang chi tiết
  };

  return (
    <StyledCard>
      <CardContent key={review.id}>
        <ContentSection>
          <CourseSection>
            <Label>Khóa học: </Label>
            <CourseName>{review.course.name}</CourseName>
          </CourseSection>

          <UserInfo>
            <div>{review.user?.firstName} {review.user?.lastName}</div>
            <div style={{ fontSize: "12px", color: "#888" }}>
              {review.user?.role === "Student" ? "Học viên" : "Giảng viên"}
            </div>
          </UserInfo>

          <RatingSection>
            <Label>Đánh giá:</Label>
            <Rate disabled value={review.rating} />
            <ReviewDate>{formatDate(review.createdAt)}</ReviewDate>
          </RatingSection>

          <ReviewSection>
            <Label>Nội dung bình luận:</Label>
            <ReviewText>{review.comment}</ReviewText>
          </ReviewSection>
          
          {/* Nút điều hướng đến trang chi tiết review */}
          <Button type="link" onClick={() => handleViewDetails(review.course.id)} style={{ padding: "0" }}>
            Xem chi tiết
          </Button>
        </ContentSection>
      </CardContent>
    </StyledCard>
    
  );
};

// Styled Components

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  background-color: #fff;
  padding: 18px;
  margin-top: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const AvatarSection = styled.div`
  display: flex;
  justify-content: center;
`;

const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const CourseSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #0f172a;
`;

const Label = styled(Text)`
  font-size: 14px;
  color: #0f172a;
  font-weight: 600;
`;

const CourseName = styled(Title).attrs({ level: 4 })`
  margin: 0 !important;
  font-size: 16px !important;
  line-height: 1.4 !important;
`;

const RatingSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ReviewSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ReviewText = styled(Text)`
  color: #334155;
  font-size: 16px;
  line-height: 1.6;
`;

const UserInfo = styled.div`
  font-size: 14px;
  color: #555;
  margin-top: 8px;
`;

export default ReviewCard;
