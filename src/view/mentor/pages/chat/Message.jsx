import React, { useContext } from 'react';
import { Avatar, Typography } from 'antd';
import styled from 'styled-components';
import { formatRelative } from 'date-fns';
import { URL } from '../../../../api/constant';

const WrapperStyled = styled.div`
  display: flex;
  margin-bottom: 12px;

  .avatar {
    margin-right: 10px;
  }

  .message {
    padding: 8px 12px;
    border-radius: 16px;
    max-width: 70%;
    word-break: break-word;
    background-color: ${({ isMentor }) => (isMentor ? '#e0f7fa' : '#f1f1f1')}; // Màu nền tin nhắn khác nhau
  }

  .author {
    font-weight: 500;
    margin-right: 8px;
    color: ${({ isMentor }) => (isMentor ? '#00796b' : '#333')}; // Màu chữ của tên người gửi khác nhau
  }

  .date {
    font-size: 11px;
    color: #888;
  }

  .header {
    display: flex;
    align-items: center;
    margin-bottom: 4px;
  }
`;

function formatDate(createdAt) {
  if (!createdAt) return ''; // Tránh lỗi nếu createdAt là null hoặc undefined

  const date = new Date(createdAt.seconds * 1000);

  return formatRelative(date, new Date());
}

export default function Message({ text, displayName, createdAt, photoURL, role }) {
  return (
    <WrapperStyled>
      <Avatar
        className="avatar"
        size="large"
        src={role === 'Mentor' ? `${URL.BASE_URL}/user/${photoURL}` : photoURL }
        alt={displayName}
      >
        {photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}
      </Avatar>
      <div>
        <div className="header">
          <Typography.Text className="author">
            {displayName} ({role === 'Mentor' ?'Giảng viên' : 'Học viên'})
          </Typography.Text>
          <Typography.Text className="date">{formatDate(createdAt)}</Typography.Text>
        </div>
        <div className="message">
          <Typography.Text>{text}</Typography.Text>
        </div>
      </div>
    </WrapperStyled>
  );
}
