import { useState } from "react";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { useNavigate, useLocation } from "react-router-dom";

const { Title } = Typography;

const UpdateCategoryForm = () => {
  const location = useLocation();
  const category = location.state || { id: 1, name: "Sample Category", description: "Sample Description" };
  
  const [name, setName] = useState(category.name);
  const [description, setDescription] = useState(category.description);
  const navigate = useNavigate();

  const handleUpdate = () => {
    message.success("Category updated successfully (sample data)");
    setTimeout(() => {
      navigate("/admin/course/category/all");
    }, 2000);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
      <Card title={<Title level={4}>Update Course Category</Title>} style={{ width: 400 }}>
        <Form layout="vertical" onFinish={handleUpdate}>
          <Form.Item label="Category Title" name="title" rules={[{ required: true, message: "Please enter the category title" }]}>  
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Item>
          <Form.Item label="Category Description" name="description">  
            <Input.TextArea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>Update Category</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default UpdateCategoryForm;