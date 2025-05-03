import React, { useState } from 'react';
import { Divider, Button } from 'antd';
import UserInfo from './UserInfo';
import RoomList from './RoomList';
import TeachingCoursesModal from './Model/TeachingCoursesModal';
import styled from 'styled-components';
import { ShareAltOutlined, BookOutlined } from '@ant-design/icons';

const SidebarWrapper = styled.aside`
  border-radius: 16px;
  background-color: #001529;
  min-height: 607px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: Inter, -apple-system, Roboto, Helvetica, sans-serif;
  padding: 24px 16px;

  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 12px;
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

  &:hover {
    background-color: #001529;
    color: #fff;
  }
`;

export default function Sidebar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <SidebarWrapper>
      <ProfileInfo>
        <UserInfo />
        <ShareButton
          icon={<BookOutlined />}
          onClick={() => setIsModalOpen(true)}
        >
          Khóa học đang dạy
        </ShareButton>
      </ProfileInfo>

      <Divider style={{ backgroundColor: '#e2e8f0', margin: '24px 0' }} />

      <RoomList />

      <TeachingCoursesModal visible={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </SidebarWrapper>
  );
}
