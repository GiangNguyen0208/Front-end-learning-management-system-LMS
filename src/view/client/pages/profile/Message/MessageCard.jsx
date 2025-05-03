import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const MessageCard = ({ thumbnail, courseName, lastMessage, lastActive, roomId }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    // navigate(`/chat-rooms/${roomId}`);
    navigate(`/chat-rooms`);
  };

  return (
    <Card onClick={handleNavigate}>
      <Thumbnail src={thumbnail} alt={courseName} />
      <Content>
        <TopRow>
          <CourseTitle>{courseName}</CourseTitle>
          <LastActive>{lastActive}</LastActive>
        </TopRow>
        <LastMessage>{lastMessage}</LastMessage>
        <EnterButton onClick={(e) => {
          e.stopPropagation(); // tránh bị click card
          handleNavigate();
        }}>
          Vào phòng chat
        </EnterButton>
      </Content>
    </Card>
  );
};

const Card = styled.div`
  display: flex;
  background: #f9fafb;
  border-radius: 16px;
  padding: 16px;
  gap: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    background: #f1f5f9;
    transform: translateY(-2px);
  }
`;

const Thumbnail = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 12px;
  object-fit: cover;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CourseTitle = styled.h4`
  margin: 0;
  font-size: 18px;
  color: #1e293b;
  font-weight: 600;
`;

const LastActive = styled.span`
  font-size: 14px;
  color: #64748b;
`;

const LastMessage = styled.p`
  margin: 4px 0;
  color: #334155;
  font-size: 15px;
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const EnterButton = styled.button`
  margin-top: 12px;
  width: fit-content;
  padding: 8px 16px;
  background-color: #3b82f6;
  color: white;
  font-size: 14px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  align-self: flex-start;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #2563eb;
  }
`;

export default MessageCard;
