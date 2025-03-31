import React from "react";
import { Row, Col, Rate, Space, Avatar, Typography } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import { URL } from "../../../../../api/constant";
const { Text } = Typography;

const CourseStats = ({course}) => {
  return (
    <div className="course-stats">
      <Row gutter={[16, 24]}>
        <Col>
          <Space align="center">
            <Text className="rating-score">4.6</Text>
            <Rate disabled defaultValue={4.6} />
            <Text className="rating-count">(651651 rating)</Text>
            <div className="vertical-divider" />
            <Text>22 Total Hours. 155 Lectures. All levels</Text>
          </Space>
        </Col>
      </Row>

      <Row className="instructor-row" align="middle">
        <Col>
          <Space align="center">
            <Avatar
              size={40}
              src={`${URL.BASE_URL}/user/${course?.mentor?.mentorDetail?.profilePic}`}
            />
            <Text>
              Giảng dạy bởi <Text className="instructor-name">{course.mentor.firstName + " " + course.mentor.lastName}</Text>
            </Text>
          </Space>
        </Col>
      </Row>

      <Row className="languages-row" align="middle">
        <Col>
          <Space align="center">
            <GlobalOutlined />
            <Text>English, Spanish, Italian, German</Text>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default CourseStats;
