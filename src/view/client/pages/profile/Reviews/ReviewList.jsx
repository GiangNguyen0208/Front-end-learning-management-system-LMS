import React, { use, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';
import ReviewCard from './ReviewCard';
import ratingApi from '../../../../../api/ratingApi';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../../../context/AuthProvider';
const { Title } = Typography;


const ReviewList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [myReviews, setMyReviews] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await ratingApi.getRatingsByUser(user.id);
        toast.success("Tải danh sách đánh giá thành công!");
        setMyReviews(response.data.ratings);
      } catch (error) {
        toast.error("Lỗi khi tải danh sách đánh giá của bạn!");
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [user]);

  return (
    <Container>
      <ReviewsWrapper>
        <ReviewsHeader>
          Đánh giá của tôi <ReviewCount>({myReviews.length})</ReviewCount>
        </ReviewsHeader>

        {myReviews.map(review => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </ReviewsWrapper>
    </Container>
  );
};

const Container = styled.div`
  background-color: #fff;
  padding: 105px 80px 483px;
  display: flex;
  justify-content: center;

  @media (max-width: 991px) {
    padding: 100px 20px;
  }
`;

const ReviewsWrapper = styled.div`
  width: 902px;
  max-width: 100%;
`;

const ReviewsHeader = styled(Title).attrs({ level: 2 })`
  color: #0f172a;
  font-family: Inter, -apple-system, Roboto, Helvetica, sans-serif;
  font-size: 20px !important;
  margin-bottom: 16px !important;
`;

const ReviewCount = styled.span`
  font-size: 12px;
  line-height: 15px;
`;

export default ReviewList;
