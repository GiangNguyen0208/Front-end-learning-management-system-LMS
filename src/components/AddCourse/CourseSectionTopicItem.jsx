import { List } from "antd";
import { VideoCameraOutlined } from "@ant-design/icons";

const CourseSectionTopicItem = ({ topic }) => {
  return (
    <List.Item>
      <VideoCameraOutlined style={{ marginRight: 8 }} />
      {topic.srNo}. {topic.name}
    </List.Item>
  );
};

export default CourseSectionTopicItem;
