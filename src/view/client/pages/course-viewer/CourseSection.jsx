import React from "react";
import { Typography, Button, Card } from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { URL } from "../../../../api/constant";

const { Text, Title } = Typography;

const CourseSection = ({ section, onSelectVideo }) => {
  console.log("CourseSection", section);
  

  return (
    <div className="course-section" style={{ padding: "20px", backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
      {/* Header with Course Title */}
      <div className="section-header" style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/20859c0e308d06795e5a8c8624e8c8452f2d8eb67a2e5d85b1900aa7823e2ea2"
          alt="Section icon"
          className="section-icon"
          style={{ width: "50px", height: "50px", marginRight: "16px", borderRadius: "50%" }}
        />
        <Text className="section-title" style={{ fontSize: "24px", fontWeight: "bold" }}>{section.name}</Text>
      </div>

      {/* Kiểm tra nếu có chủ đề học */}
      {section.courseSectionTopics.length > 0 ? (
        section.courseSectionTopics.map((topic, index) => (
          <Card key={index} style={{ marginBottom: 16 }}>
            <Title level={4}>{topic.name}</Title>
            <Text>{topic.description}</Text>
            <div style={{ marginTop: 8 }}>
            <Button
              type="primary"
              onClick={() => {
                const videoUrl = `${URL.BASE_URL}/course/video/${topic.videoFileName}`;
                onSelectVideo(videoUrl, topic.id);
              }}
            >
              Xem Video
            </Button>
            </div>
          </Card>
        ))
      ) : (
        <div
          style={{
            marginTop: 24,
            padding: "16px",
            background: "#f7f7f7",
            borderRadius: 8,
            textAlign: "center",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <ExclamationCircleOutlined style={{ fontSize: 24, color: "#ff9900", marginBottom: 8 }} />
          <Text type="secondary" style={{ fontSize: 16 }}>
            Khóa học này chưa có phần học. Vui lòng quay lại sau khi khóa học được cập nhật.
          </Text>
        </div>
      )}
    </div>
  );
};

export default CourseSection;
