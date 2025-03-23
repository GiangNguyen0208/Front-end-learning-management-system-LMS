import { useState } from "react";
import { Modal, Form, Input, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const AddCourseSectionTopicModal = ({ visible, onClose, onSubmit }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]); // ✅ Quản lý fileList bằng state

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      onSubmit({ ...values, video: fileList }); // Gửi cả dữ liệu form và fileList
      form.resetFields();
      setFileList([]); // ✅ Reset fileList sau khi submit
      onClose();
    });
  };

  const handleChange = ({ fileList }) => {
    setFileList(fileList); // ✅ Cập nhật danh sách file khi chọn file mới
  };

  return (
    <Modal title="Thêm Chủ Đề Mới" open={visible} onCancel={onClose} footer={null}>
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
        <Form.Item label="Tải lên video">
          <Upload
            fileList={fileList} // ✅ Dùng fileList thay vì value
            beforeUpload={() => false} // ✅ Ngăn upload ngay lập tức
            onChange={handleChange} // ✅ Cập nhật state khi thay đổi file
          >
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
