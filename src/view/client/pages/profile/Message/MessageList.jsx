import React from "react";
import styled from "styled-components";
import MessageCard from "./MessageCard";

const MessageList = () => {
  const chatRooms = [
    {
      id: 1,
      thumbnail: "https://images.unsplash.com/photo-1605902711622-cfb43c4437d5",
      courseName: "React for Beginners",
      lastMessage: "Looking forward to our next session!",
      lastActive: "2 hours ago",
    },
    {
      id: 2,
      thumbnail: "https://images.unsplash.com/photo-1581091870622-2d51aa51f20b",
      courseName: "Advanced Node.js",
      lastMessage: "Don't forget to submit your assignment.",
      lastActive: "1 day ago",
    },
    {
      id: 3,
      thumbnail: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca",
      courseName: "UI/UX Design Bootcamp",
      lastMessage: "New prototype files are uploaded!",
      lastActive: "3 days ago",
    },
  ];

  return (
    <Wrapper>
      <Title>💬 Thảo luận môn học</Title>
      <RoomGrid>
        {chatRooms.map((room) => (
          <MessageCard
            key={room.id}
            roomId={room.id}
            thumbnail={room.thumbnail}
            courseName={room.courseName}
            lastMessage={room.lastMessage}
            lastActive={room.lastActive}
          />
        ))}
      </RoomGrid>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  max-width: 900px;
  margin: 40px auto;
  padding: 0 20px;
  font-family: Inter, -apple-system, Roboto, Helvetica, sans-serif;
`;

const Title = styled.h2`
  font-size: 28px;
  color: #0f172a;
  margin-bottom: 24px;
  text-align: center;
`;

const RoomGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export default MessageList;
