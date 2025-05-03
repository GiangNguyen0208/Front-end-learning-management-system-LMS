import React from 'react';
import { Row, Col } from 'antd';
import ChatWindow from './ChatWindow';

export default function ChatRoom() {
  return (
    <div>
      <Row>
          <ChatWindow />
      </Row>
    </div>
  );
}