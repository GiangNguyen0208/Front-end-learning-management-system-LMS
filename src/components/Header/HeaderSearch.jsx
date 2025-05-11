// src/components/Header/HeaderSearch.jsx
import React from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const HeaderSearch = ({ onSearch }) => {
  return (
    <Input
      prefix={<SearchOutlined className="search-icon" />}
      placeholder="Tìm kiếm khóa học"
      className="header-search"
      allowClear
      onChange={(e) => onSearch(e.target.value)}
    />
  );
};

export default HeaderSearch;
