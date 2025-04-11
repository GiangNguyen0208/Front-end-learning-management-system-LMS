import React from "react";
import { Avatar, Row, Col, Space } from "antd";
import { StarFilled, UserOutlined, BookOutlined } from "@ant-design/icons";
import {
  InstructorSection,
  InstructorName,
  InstructorTitle,
  StatItem,
  InstructorBio,
  StatsWrapper,
} from "../js/styles";
import { URL } from "../../../../../api/constant";

const CourseInstructor = ({course}) => {
  const mentorData = course?.mentor || null;
  return (
    <InstructorSection>
      <InstructorName>{mentorData.firstName + " " + mentorData.lastName}</InstructorName>
      <InstructorTitle>{mentorData.mentorDetail.profession}</InstructorTitle>

      <Row gutter={[16, 16]} align="middle">
        <Col>
          <Avatar
            size={120}
            src={`${URL.BASE_URL}/user/${mentorData.mentorDetail.profilePic}`}
          />
        </Col>
        <Col>
          <StatsWrapper>
            <StatItem>
              <StarFilled />
              <span>40,445 Reviews</span>
            </StatItem>
            <StatItem>
              <UserOutlined />
              <span>500 Students</span>
            </StatItem>
            <StatItem>
              <BookOutlined />
              <span>15 Courses</span>
            </StatItem>
          </StatsWrapper>
        </Col>
      </Row>

      <InstructorBio>
        {mentorData.mentorDetail.bio}
      </InstructorBio>
    </InstructorSection>
  );
};

export default CourseInstructor;