import { useState } from "react";
import { Modal, Form, Input, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import courseApi from "../../api/courseApi";

const AddCourseSectionTopicModal = ({ visible, onClose, onSubmit, sectionId }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]); // ✅ Quản lý fileList bằng state

  const handleSubmit = () => {
    form.validateFields().then(async (values) => {
      if (!fileList.length) {
        message.error("Vui lòng tải lên video!");
        return;
      }
      console.log(values);
      
      const formData = new FormData();
      formData.append("srNo", values.srNo);
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("sectionId", sectionId); // Đảm bảo có sectionId
      formData.append("video", fileList[0].originFileObj); // Lấy file thực tế
  
      try {
        const response = await courseApi.addCourseSectionTopic(formData);
        message.success("Thêm chủ đề thành công!");
        console.log("✅ API Response:", response.data);
  
        form.resetFields();
        setFileList([]); // Reset sau khi thành công
        onClose();
      } catch (error) {
        console.error("❌ Lỗi API:", error.response?.data || error);
        message.error("Thêm chủ đề thất bại!");
      }
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
