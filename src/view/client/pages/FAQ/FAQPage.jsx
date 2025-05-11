import React from "react";
import { Collapse, Typography } from "antd";
import "./FAQPage.css"; // Import CSS file for styling

const { Title } = Typography;
const { Panel } = Collapse;

const FAQPage = () => {
  return (
    <div className="page-container">
      <Title level={2}>Câu hỏi thường gặp</Title>
      <Collapse accordion>
        <Panel header="Làm sao để đăng ký khóa học?" key="1">
          Bạn chỉ cần tạo tài khoản, chọn khóa học và nhấn nút “Đăng ký”.
        </Panel>
        <Panel header="Khóa học có thời hạn không?" key="2">
          Không. Bạn có thể học bất cứ khi nào bạn muốn sau khi đã đăng ký.
        </Panel>
        <Panel header="Tôi có thể nhận chứng chỉ không?" key="3">
          Có, bạn sẽ nhận chứng chỉ điện tử sau khi hoàn thành khóa học.
        </Panel>
      </Collapse>
    </div>
  );
};

export default FAQPage;
