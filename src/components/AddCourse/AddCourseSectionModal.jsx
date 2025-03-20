import { Modal, Form, Input, Button } from "antd";
import courseApi from "../../api/courseApi";

const AddCourseSectionModal = ({ visible, onClose, onSuccess }) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await courseApi.addCourseSection(values);
      form.resetFields();
      onSuccess(); // Gọi lại danh sách khóa học
      onClose();
    } catch (error) {
      console.error("Lỗi khi thêm chương:", error);
    }
  };

  return (
    <Modal title="Thêm Chương Mới" visible={visible} onCancel={onClose} footer={null}>
      <Form form={form} layout="vertical">
        <Form.Item label="Số thứ tự" name="srNo" rules={[{ required: true, message: "Nhập số thứ tự" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Tên chương" name="name" rules={[{ required: true, message: "Nhập tên chương" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Mô tả" name="description">
          <Input.TextArea rows={3} />
        </Form.Item>
        <Button type="primary" onClick={handleSubmit} block>
          Thêm
        </Button>
      </Form>
    </Modal>
  );
};

export default AddCourseSectionModal;
