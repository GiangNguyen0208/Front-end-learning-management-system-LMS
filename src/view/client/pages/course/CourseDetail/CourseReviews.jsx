import React from "react";
import { Rate, Progress, Avatar, List } from "antd";
import {
  ReviewsSection,
  ReviewsHeader,
  RatingOverview,
  RatingStats,
  ReviewItem,
  ReviewerInfo,
  ReviewContent,
  ReviewDate,
  ViewMoreButton,
} from "../js/styles";
import { formatDate } from "../../../../../utils/helper/formatDate";
import { useExpandableList } from "../../../../../utils/helper/useExpandableList ";
import { UserOutlined } from "@ant-design/icons";

const getRatingDistribution = (ratings) => {
  const total = ratings.length;
  const distribution = [0, 0, 0, 0, 0]; // Index 0 = 1 star, Index 4 = 5 stars

  ratings.forEach(({ rating }) => {
    if (rating >= 1 && rating <= 5) {
      distribution[rating - 1]++;
    }
  });

  return distribution
    .map((count, index) => ({
      stars: index + 1,
      percentage: total > 0 ? Math.round((count / total) * 100) : 0,
    }))
    .reverse(); // Hiển thị từ 5 → 1 sao
};

const CourseReviews = ({ ratings = [] }) => {
  const ratingStats = getRatingDistribution(ratings);

  const averageRating =
    ratings.length > 0
      ? (
          ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
        ).toFixed(1)
      : 0;

  const { visibleItems, canExpand, handleExpand } = useExpandableList(ratings, 3, 3);

  return (
    <ReviewsSection>
      <ReviewsHeader>
        <RatingOverview>
          <div>
            <Rate disabled value={parseFloat(averageRating)} /> {averageRating}
          </div>
          <span>{ratings.length} đánh giá</span>
        </RatingOverview>

        <RatingStats>
          {ratingStats.map((stat) => (
            <div key={stat.stars}>
              <span>{stat.stars} sao</span>
              <Progress percent={stat.percentage} showInfo={false} />
              <span>{stat.percentage}%</span>
            </div>
          ))}
        </RatingStats>
      </ReviewsHeader>

      <List
        dataSource={visibleItems}
        locale={{ emptyText: "Chưa có đánh giá nào" }}
        renderItem={(review) => (
          <ReviewItem key={review.id}>
            <ReviewerInfo>
              <Avatar
                size={60}
                src={review.user?.avatar}
                icon={!review.user?.avatar && <UserOutlined />}
              />
              <div>
                <div>{review.user?.firstName} {review.user?.lastName}</div>
                <div style={{ fontSize: "12px", color: "#888" }}>
                  {review.user?.role === "Student" ? "Học viên" : "Giảng viên"}
                </div>
              </div>
            </ReviewerInfo>
            <ReviewContent>
              <div>
                <Rate disabled value={review.rating} />
                <ReviewDate>{formatDate(review.createdAt)}</ReviewDate>
              </div>
              <p>{review.comment}</p>
            </ReviewContent>
          </ReviewItem>
        )}
      />

      {canExpand && (
        <ViewMoreButton onClick={handleExpand}>Xem thêm đánh giá</ViewMoreButton>
      )}
    </ReviewsSection>
  );
};

export default CourseReviews;
