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

const CourseSyllabus = ({ course }) => {

  return (
    <SyllabusSection>
      <SyllabusTitle>Syllabus</SyllabusTitle>
      <List
        dataSource={course.sections || []}
        renderItem={(item) => (
          <LessonItem>
            <LessonTitle>{item.name}</LessonTitle>
            <LessonStats>
              <Space>
                <ReadOutlined />
                <span>{item.courseSectionTopics?.length || 0} Lessons</span>
              </Space>
              <Space>
                <ClockCircleOutlined />
                <span>~{(item.courseSectionTopics?.length || 0) * 10} minutes</span>
              </Space>
            </LessonStats>
          </LessonItem>
        )}
      />
    </SyllabusSection>
  );
};

export default CourseSyllabus;
