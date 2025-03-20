import React from "react";
import { Result } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import "./styles.css";

const OrderComplete = () => {
  return (
    <div className="order-complete-wrapper">
      <div className="icon-wrapper">
        <div className="success-icon">
          <CheckOutlined className="check-icon" />
        </div>
      </div>
      <Result
        icon={null}
        title="Order Complete"
        subTitle="You Will Receive a confirmation email soon!"
        className="order-result"
      />
    </div>
  );
};

export default OrderComplete;
