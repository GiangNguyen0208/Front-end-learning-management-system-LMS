import React from "react";
import { Tabs } from "antd";
import CourseDescription from "./CourseDescription";
import CourseInstructor from "./CourseInstructor";
import CourseSyllabus from "./CourseSyllabus";
import CourseReviews from "./CourseReviews";
import { StyledTabs, CourseDetailsWrapper } from "../js/styles";

const CourseDetails = ({ courseDetail }) => {
  const items = [
    {
      key: "1",
      label: "Description",
      children: <CourseDescription courseDetail={courseDetail} />,
    },
    {
      key: "2",
      label: "Instructor",
      children: <CourseInstructor courseDetail={courseDetail} />,
    },
    {
      key: "3",
      label: "Syllabus",
      children: <CourseSyllabus courseDetail={courseDetail} />,
    },
    {
      key: "4",
      label: "Reviews",
      children: <CourseReviews courseDetail={courseDetail} />,
    },
  ];

  return (
    <CourseDetailsWrapper>
      <StyledTabs items={items} defaultActiveKey="1" />
    </CourseDetailsWrapper>
  );
};

export default CourseDetails;