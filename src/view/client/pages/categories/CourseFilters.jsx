import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Select,
  Rate,
  Checkbox,
  Typography,
  Space,
  Divider,
} from "antd";
import { FilterOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const CourseFilters = ({ courses, onFilterChange }) => {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOrder, setSortOrder] = useState("relevance");
  const courseTypes = [...new Set(courses.map((c) => c.type))];
  const courseCategories = [...new Set(courses.map((c) => c.categoryName))];

  const handleTypeChange = (checkedValues) => {
    setSelectedTypes(checkedValues);
  };

  const handleCategoryChange = (checkedValues) => {
    setSelectedCategories(checkedValues);
  };

  const handlePriceChange = (checkedValues) => {
    setSelectedPrices(checkedValues);
  };

  const handleSortChange = (value) => {
    setSortOrder(value);
  };

  useEffect(() => {
    onFilterChange({
      types: selectedTypes,
      priceRanges: selectedPrices,
      sortOrder: sortOrder,
      selectedCategories: selectedCategories,
    });
  }, [selectedTypes, selectedPrices, sortOrder, selectedCategories]);

  return (
    <Space direction="vertical" size={16} style={{ width: "100%" }}>
      <div className="filter-header" style={{ display: "flex", justifyContent: "space-between" }}>
        <Button icon={<FilterOutlined />}>Lọc</Button>
        <Space>
          <Text>Sắp xếp</Text>
          <Select
            value={sortOrder}
            style={{ width: 150 }}
            onChange={handleSortChange}
            options={[
              { value: "relevance", label: "Khóa học liên quan" },
              { value: "a-z", label: "Theo A-Z" },
              { value: "z-a", label: "Theo Z-A" },
              { value: "low-high", label: "Theo giá thấp đến cao" },
              { value: "high-low", label: "Theo giá cao đến thấp" },
            ]}
          />
        </Space>
      </div>

      <Card className="filter-section">
        <Space direction="vertical" style={{ width: "100%" }}>
          {/* Loại khóa học */}
          <div className="filter-group">
            <Title level={5}>Loại khóa học</Title>
            <Checkbox.Group onChange={handleTypeChange}>
              <Space direction="vertical">
                {courseTypes.map((type) => (
                  <Checkbox key={type} value={type}>
                    {type}
                  </Checkbox>
                ))}
              </Space>
            </Checkbox.Group>
          </div>

          <Divider />

          {/* Giá */}
          <div className="filter-group">
            <Title level={5}>Khoảng giá</Title>
            <Checkbox.Group onChange={handlePriceChange}>
              <Space direction="vertical">
                <Checkbox value="free">Miễn phí</Checkbox>
                <Checkbox value="lt5m">Dưới 5 triệu</Checkbox>
                <Checkbox value="5to10m">5–10 triệu</Checkbox>
                <Checkbox value="gt10m">Trên 10 triệu</Checkbox>
              </Space>
            </Checkbox.Group>
          </div>

          <Divider />

          {/* Danh mục */}
          <div className="filter-group">
            <Title level={5}>Danh mục</Title>
            <Checkbox.Group onChange={handleCategoryChange}>
              <Space direction="vertical">
                {courseCategories.map((cate) => (
                  <Checkbox key={cate} value={cate}>
                    {cate}
                  </Checkbox>
                ))}
              </Space>
            </Checkbox.Group>
          </div>
        </Space>
      </Card>
    </Space>
  );
};


export default CourseFilters;
