import React, { useState } from "react";
import { Typography, Button, Card } from "antd";
import { DownOutlined, UpOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { URL } from "../../../../api/constant";

const { Text, Title } = Typography;

const CourseSection = ({ section, onSelectVideo }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => setIsExpanded(prev => !prev);

  return (
    <div
      className="course-section"
      style={{
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        marginBottom: "16px"
      }}
    >
      {/* Section Header with Toggle */}
      <div
        className="section-header"
        onClick={toggleExpand}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "12px",
          cursor: "pointer"
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Text style={{ fontSize: "20px", fontWeight: "bold" }}>{section.name}</Text>
        </div>
        {isExpanded ? <UpOutlined /> : <DownOutlined />}
      </div>

      {/* Section Content with Collapse Animation */}
      <div
        className="section-content"
        style={{
          maxHeight: isExpanded ? "2000px" : "0px",
          overflow: "hidden",
          transition: "max-height 0.4s ease"
        }}
      >
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
    </div>
  );
};

export default CourseSection;
