import React from "react";
import { Checkbox, Typography } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";

const { Text } = Typography;

const ChapterItem = ({ chapter }) => {
  return (
    <div className={`chapter-item ${chapter.isActive ? "active" : ""}`}>
      <div className="chapter-content">
        {chapter.isCompleted ? (
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/7ac7c85de6c8ae2482073a83f46ca6dc6cc1b663f163d62eb447b1e80b840e5a"
            alt="Completed"
            className="chapter-icon"
          />
        ) : (
          <Checkbox
            checked={chapter.isCompleted}
            className="chapter-checkbox"
          />
        )}
        <Text className="chapter-number">{chapter.number}.</Text>
        <Text className="chapter-title">{chapter.title}</Text>
      </div>
      <div className="chapter-duration">
        <ClockCircleOutlined className="duration-icon" />
        <Text className="duration-text">{chapter.duration}</Text>
      </div>
    </div>
  );
};

export default ChapterItem;
