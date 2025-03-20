import { useState } from "react";
import { Collapse, Button, List, Badge } from "antd";
import { PlusOutlined, VideoCameraOutlined } from "@ant-design/icons";

const { Panel } = Collapse;

const CourseSectionList = ({ course, showAddSectionModal, showAddTopicModal }) => {
  const [expandedSection, setExpandedSection] = useState(null);

  return (
    <div>
      <h3>Chương học</h3>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        className="mb-3"
        onClick={showAddSectionModal}
      >
        Thêm Chương
      </Button>

      <Collapse accordion activeKey={expandedSection} onChange={setExpandedSection}>
        {course.sections.map((section, sectionIndex) => (
          <Panel
            header={
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>
                  <Badge count={section.srNo} style={{ backgroundColor: "#52c41a", marginRight: 8 }} />
                  <strong>{section.name}</strong>
                </span>
                <Badge count={section.courseSectionTopics.length} showZero />
              </div>
            }
            key={sectionIndex}
          >
            <Button
              type="dashed"
              icon={<PlusOutlined />}
              className="mb-2"
              onClick={() => showAddTopicModal(section.id)}
            >
              Thêm Chủ Đề
            </Button>

            <List
              dataSource={section.courseSectionTopics}
              renderItem={(topic) => (
                <List.Item>
                  <VideoCameraOutlined style={{ marginRight: 8 }} />
                  {topic.srNo}. {topic.name}
                </List.Item>
              )}
            />
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default CourseSectionList;
