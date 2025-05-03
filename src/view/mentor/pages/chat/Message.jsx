import React from 'react';
import { Avatar, Typography } from 'antd';
import styled from 'styled-components';
import { formatRelative } from 'date-fns';

const WrapperStyled = styled.div`
  display: flex;
  margin-bottom: 12px;

  .avatar {
    margin-right: 10px;
  }

  .message {
    background-color: #f1f1f1;
    padding: 8px 12px;
    border-radius: 16px;
    max-width: 70%;
    word-break: break-word;
  }

  .author {
    font-weight: 500;
    margin-right: 8px;
    color: #333;
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

export default function Message({ text, displayName, createdAt, photoURL }) {
  return (
    <WrapperStyled>
      <Avatar className="avatar" size="large" src={photoURL}>
        {photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}
      </Avatar>
      <div>
        <div className="header">
          <Typography.Text className="author">{displayName}</Typography.Text>
          <Typography.Text className="date">{formatDate(createdAt)}</Typography.Text>
        </div>
        <div className="message">
          <Typography.Text>{text}</Typography.Text>
        </div>
      </div>
    </WrapperStyled>
  );
}

