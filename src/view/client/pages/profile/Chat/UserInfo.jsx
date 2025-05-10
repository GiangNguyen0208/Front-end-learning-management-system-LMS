import React, { useContext } from 'react';
import { AuthContext } from '../../../../../context/AuthProvider';
import styled from 'styled-components';

const Avatar = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
`;

const Name = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-top: 16px;
  color: #0f172a;
`;

export default function UserInfo() {
  const { userFireBase } = useContext(AuthContext) || {};
  if (!userFireBase) return null;

  const { displayName, photoURL } = userFireBase;

  return (
    <>
      <Avatar src={photoURL} alt={displayName} />
      <Name>{displayName}</Name>
    </>
  );
}
