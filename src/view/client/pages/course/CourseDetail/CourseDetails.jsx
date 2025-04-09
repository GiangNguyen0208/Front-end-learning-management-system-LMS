import React from "react";
import { Tabs } from "antd";
import CourseDescription from "./CourseDescription";
import CourseInstructor from "./CourseInstructor";
import CourseSyllabus from "./CourseSyllabus";
import CourseReviews from "./CourseReviews";
import { StyledTabs, CourseDetailsWrapper } from "../js/styles";

const CourseDetails = ({ course }) => {
  const items = [
    {
      key: "1",
      label: "Description",
      children: <CourseDescription course={course} />,
    },
    {
      key: "2",
      label: "Instructor",
      children: <CourseInstructor course={course} />,
    },
    {
      key: "3",
      label: "Syllabus",
      children: <CourseSyllabus course={course} />,
    },
    {
      key: "4",
      label: "Reviews",
      children: <CourseReviews course={course} />,
    },
  ];

  return (
    <CourseDetailsWrapper>
      <StyledTabs items={items} defaultActiveKey="1" />
    </CourseDetailsWrapper>
  );
};

export default CourseDetails;