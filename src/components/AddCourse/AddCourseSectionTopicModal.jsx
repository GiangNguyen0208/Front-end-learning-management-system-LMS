import { Modal, Form, Input, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const AddCourseSectionTopicModal = ({ visible, onClose, onSubmit }) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      onSubmit(values);
      form.resetFields();
    });
  };

  return (
    <Modal title="Thêm Chủ Đề Mới" visible={visible} onCancel={onClose} footer={null}>
      <Form form={form} layout="vertical">
        <Form.Item label="Số thứ tự" name="srNo" rules={[{ required: true, message: "Nhập số thứ tự" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Tên chủ đề" name="name" rules={[{ required: true, message: "Nhập tên chủ đề" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Mô tả" name="description">
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item label="Tải lên video" name="video">
          <Upload beforeUpload={() => false}>
            <Button icon={<UploadOutlined />}>Chọn video</Button>
          </Upload>
        </Form.Item>
        <Button type="primary" onClick={handleSubmit} block>
          Thêm
        </Button>
      </Form>
    </Modal>
  );
};

export default AddCourseSectionTopicModal;
