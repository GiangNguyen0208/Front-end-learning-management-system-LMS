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

const CourseInstructor = () => {
  return (
    <InstructorSection>
      <InstructorName>Ronald Richards</InstructorName>
      <InstructorTitle>UI/UX Designer</InstructorTitle>

      <Row gutter={[16, 16]} align="middle">
        <Col>
          <Avatar
            size={120}
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/e4dc102c55492ab8fbd4f7b12f0f88eb83749e901866e392a737939b328b1582"
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
        With over a decade of industry experience, Ronald brings a wealth of
        practical knowledge to the classroom. He has played a pivotal role in
        designing user-centric interfaces for renowned tech companies, ensuring
        seamless and engaging user experiences.
      </InstructorBio>
    </InstructorSection>
  );
};

export default CourseInstructor;