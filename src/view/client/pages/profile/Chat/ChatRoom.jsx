import React from 'react';
import { Row, Col } from 'antd';
import ChatWindow from './ChatWindow';
import Sidebar from './Sidebar';

export default function ChatRoom() {
  return (
      <div>
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