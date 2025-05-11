import React from 'react';
import { Row, Col, Typography } from 'antd';
import ChatWindow from './ChatWindow';
import Sidebar from './Sidebar';
const { Title, Paragraph } = Typography;

export default function ChatRoom() {
  return (
      <div>
        <Title>Chào mừng đến với phòng chat</Title>
        <Row>
          <Col span={18}>
            <ChatWindow />
          </Col>
          <Col span={6}>
            <Sidebar />
          </Col>
        </Row>
        {/* <AddRoomModal /> */}
        {/* <InviteMemberModal /> */}
      </div>
    );
}