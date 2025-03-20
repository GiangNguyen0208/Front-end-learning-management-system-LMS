import React from "react";
import { Breadcrumb as AntBreadcrumb } from "antd";
import { RightOutlined } from "@ant-design/icons";

const Breadcrumb = () => {
  const breadcrumbItems = [
    { title: "Home" },
    { title: "Categories" },
    { title: "Introduction to User Experience Design", className: "current" },
  ];

  return (
    <AntBreadcrumb
      separator={<RightOutlined className="breadcrumb-separator" />}
      className="course-breadcrumb"
      items={breadcrumbItems}
    />
  );
};

export default Breadcrumb;
