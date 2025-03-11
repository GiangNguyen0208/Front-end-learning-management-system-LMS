import React from "react";
import { ConfigProvider } from "antd";
import ReviewsPage from "./reviews/ReviewsPage";

// You can customize Ant Design theme here
const themeConfig = {
  token: {
    colorPrimary: "#3b82f6",
    borderRadius: 8,
    fontFamily: "Inter, sans-serif",
  },
};

const Communication = () => {
  return (
    <ConfigProvider theme={themeConfig}>
        <ReviewsPage />
    </ConfigProvider>
  );
};

export default Communication;
