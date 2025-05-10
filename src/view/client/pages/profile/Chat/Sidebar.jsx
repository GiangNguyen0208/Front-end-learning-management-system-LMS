import React, { useContext } from 'react';
import { Button } from 'antd';
import RoomList from './RoomList';
import styled from 'styled-components';

const SidebarWrapper = styled.aside`
  border-radius: 16px;
  background-color: #001529;
  min-height: 607px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 24px 16px;
  font-family: Inter, -apple-system, Roboto, Helvetica, sans-serif;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  @media (max-width: 991px) {
    margin-top: 40px;
  }

  /* Add a border radius to the whole sidebar for a modern feel */
  border-radius: 20px;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 12px;
  color: #fff;
  margin-bottom: 24px;
`;

const ShareButton = styled(Button)`
  margin-top: 16px;
  border-radius: 8px;
  border: 1px solid #001529;
  background-color: #fff;
  height: 48px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  text-transform: uppercase;

  &:hover {
    background-color: #001529;
    color: #fff;
  }
`;

export default function Sidebar() {
  return (
    <SidebarWrapper>
      <ProfileInfo>
        {/* Optional Profile Info section */}
      </ProfileInfo>
      <RoomList />
    </SidebarWrapper>
  );
}
