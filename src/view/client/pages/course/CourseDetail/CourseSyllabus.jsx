import React from "react";
import { List, Space } from "antd";
import { ClockCircleOutlined, ReadOutlined } from "@ant-design/icons";
import {
  SyllabusSection,
  SyllabusTitle,
  LessonItem,
  LessonTitle,
  LessonStats,
} from "../js/styles";

const syllabusData = [
  {
    title: "Introduction to UX Design",
    lessons: 5,
    duration: "1 hour",
  },
  {
    title: "Basics of User-Centered Design",
    lessons: 5,
    duration: "1 hour",
  },
  {
    title: "Elements of User Experience",
    lessons: 5,
    duration: "1 hour",
  },
  {
    title: "Visual Design Principles",
    lessons: 5,
    duration: "1 hour",
  },
];

const CourseSyllabus = () => {
  return (
    <SyllabusSection>
      <SyllabusTitle>Syllabus</SyllabusTitle>
      <List
        dataSource={syllabusData}
        renderItem={(item) => (
          <LessonItem>
            <LessonTitle>{item.title}</LessonTitle>
            <LessonStats>
              <Space>
                <ReadOutlined />
                <span>{item.lessons} Lessons</span>
              </Space>
              <Space>
                <ClockCircleOutlined />
                <span>{item.duration}</span>
              </Space>
            </LessonStats>
          </LessonItem>
        )}
      />
    </SyllabusSection>
  );
};

export default CourseSyllabus;