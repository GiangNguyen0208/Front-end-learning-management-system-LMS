import React from 'react';
import { Row, Col } from 'antd';
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';
import AddRoomModal from './Model/AddRoomModal';
import InviteMemberModal from './Model/InviteMemberModal';

export default function ChatRoomMentor() {
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
      <AddRoomModal />
      <InviteMemberModal />
    </div>
  );
}