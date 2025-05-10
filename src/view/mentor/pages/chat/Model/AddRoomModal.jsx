import React, { use, useContext, useEffect } from "react";
import { Form, Modal, Input } from "antd";
import { addDocument } from "../../../../../firebase/services";
import { AuthContext } from "../../../../../context/AuthProvider";
import { AppContext } from "../../../../../context/AppProvider";
import courseApi from "../../../../../api/courseApi";
import { toast } from "react-toastify";

export default function AddRoomModal() {
  const { isAddRoomVisible, setIsAddRoomVisible, selectedCourseId } = useContext(AppContext);
  const { user } = useContext(AuthContext);
  const [form] = Form.useForm();

  const handleOk = async () => {
    if (!user) return;
  
    try {
      const values = await form.validateFields(); // { name, description? }
  
      const newRoom = {
        roomId: `${user.id}_${selectedCourseId}`,
        name: values.name,
        description: values.description ?? "",
        mentorId: user.id,
        courseId: selectedCourseId,
        // members: [...new Set([...members, user.id])], // thêm vào đây
        createdAt: new Date(),
      };
  
      await addDocument("rooms", newRoom);
  
      form.resetFields();
      setIsAddRoomVisible(false);
    } catch (error) {
      console.error("❌ Lỗi khi thêm phòng:", error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setIsAddRoomVisible(false);
  };

  return (
    <Modal
      title="Tạo phòng"
      open={isAddRoomVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      okButtonProps={{ disabled: !user }} // Disable OK nếu user null
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Tên phòng"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên phòng!" }]}
        >
          <Input placeholder="Nhập tên phòng" />
        </Form.Item>
        <Form.Item label="Mô tả" name="description">
          <Input.TextArea placeholder="Nhập mô tả" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
