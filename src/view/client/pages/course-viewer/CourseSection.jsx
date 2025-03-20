import React from "react";
import { Typography } from "antd";
import ChapterItem from "./ChapterItem";

const { Text } = Typography;

const CourseSection = ({ section }) => {
  return (
    <div className="course-section">
      <div className="section-header">
        <img
          src={
            section.isActive
              ? "https://cdn.builder.io/api/v1/image/assets/TEMP/20859c0e308d06795e5a8c8624e8c8452f2d8eb67a2e5d85b1900aa7823e2ea2"
              : "https://cdn.builder.io/api/v1/image/assets/TEMP/9f84db2fe9437df3fa08baabcc3e7bc905ab6e9ecbb83471f951e5f9c9307eb5"
          }
          alt="Section icon"
          className="section-icon"
        />
        <Text className="section-title">{section.title}</Text>
      </div>
      {section.isActive &&
        section.chapters.map((chapter, index) => (
          <ChapterItem key={index} chapter={chapter} />
        ))}
    </div>
  );
};

export default CourseSection;
