import React, { useState } from "react";
import { Modal, Form, Input, Button, message, Select } from "antd";
import categoryApi from "../../api/categoryApi"; // Import API
import { toast } from "react-toastify";

const { Option } = Select;

const AddCategoryForm = ({ visible, onClose }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("DEACTIVATED"); // State lưu trạng thái
  const [loading, setLoading] = useState(false); // Trạng thái loading khi gọi API

  const saveCategory = async () => {
    if (!name || !description) {
      message.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const response = await categoryApi.addCategory({ name, description, status });
      if (response.data?.success) {
        toast.success("Thêm danh mục thành công!");

        setTimeout(() => {
          setName("");
          setDescription("");
          setStatus(status); // Reset trạng thái về ACTIVE
          onClose();
        }, 500); // Chờ 500ms trước khi đóng modal
      } else {
        toast.error("Thêm danh mục thất bại");
      }
    } catch (error) {
      message.error("Error occurred while adding category.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal title="Thêm danh mục" open={visible} onCancel={onClose} footer={null}>
      <Form layout="vertical" onFinish={saveCategory}>
        <Form.Item label="Tiêu đề danh mục" required>
          <Input placeholder="Enter title.." value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Item>
        
        <Form.Item label="Mô tả danh mục" required>
          <Input.TextArea rows={3} placeholder="Enter description.." value={description} onChange={(e) => setDescription(e.target.value)} />
        </Form.Item>

        {/* Dropdown chọn trạng thái */}
        <Form.Item label="Tình trạng" required>
          <Select value={status} onChange={setStatus}>
            <Option value="ACTIVE">ACTIVE</Option>
            <Option value="DEACTIVATED">DEACTIVATED</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            {loading ? "Đang thêm..." : "Thêm danh mục của khóa học"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCategoryForm;
