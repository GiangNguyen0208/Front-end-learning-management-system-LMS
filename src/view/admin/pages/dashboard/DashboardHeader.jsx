import React, { useState } from "react";
import { Typography, Button } from "antd";
import AddCategoryForm from "../../../../components/AddCategory/AddCategoryForm";

const { Title } = Typography;

const DashboardHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="dashboard-header">
      <Title level={3} className="dashboard-title">Dashboard</Title>
      <div className="dashboard-actions">
        <Button onClick={() => setIsModalOpen(true)} type="primary">
          Add Category
        </Button>
        <Button type="primary">Add Course</Button>
        <Button type="text">...</Button>
      </div>
      <AddCategoryForm visible={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default DashboardHeader;
