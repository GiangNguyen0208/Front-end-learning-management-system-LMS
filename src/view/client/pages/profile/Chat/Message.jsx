import React, { useContext } from 'react';
import { Avatar, Typography } from 'antd';
import styled from 'styled-components';
import { formatRelative } from 'date-fns';
import { URL } from '../../../../../api/constant';

const WrapperStyled = styled.div`
  margin-bottom: 10px;

  .author {
    margin-left: 5px;
    font-weight: bold;
  }

  .date {
    margin-left: 10px;
    font-size: 11px;
    color: #a7a7a7;
  }

  .content {
    margin-left: 30px;
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
      <div>
      <Avatar
        className="avatar"
        size="large"
        src={role !== 'Student' ? `${URL.BASE_URL}/user/${photoURL}` : photoURL}
        alt={displayName}
      >
        {photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}
      </Avatar>
        <Typography.Text className="author">
          {displayName} ({role === 'Student' ? 'Học viên' : 'Giảng viên'})
        </Typography.Text>
        <Typography.Text className="date">{formatDate(createdAt)}</Typography.Text>
      </div>
      <div>
        <Typography.Text className="content">{text}</Typography.Text>
      </div>
    </WrapperStyled>
  );
}
