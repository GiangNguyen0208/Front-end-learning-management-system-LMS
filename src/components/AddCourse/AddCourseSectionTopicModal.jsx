import { useState } from "react";
import { Modal, Form, Input, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import courseApi from "../../api/courseApi";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AddCourseSectionTopicModal = ({ visible, onClose, sectionId }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const handleSubmit = () => {
    form.validateFields().then(async (values) => {
      if (!fileList.length) {
        toast.error("Vui lòng tải lên video!");
        return;
      }

      const file = fileList[0].originFileObj;
      if (!file.type.startsWith("video/")) {
        toast.error("Chỉ được phép tải lên file video!");
        return;
      }

      const formData = new FormData();
      formData.append("srNo", values.srNo);
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("sectionId", sectionId);
      formData.append("video", file);

      try {
        await courseApi.addCourseSectionTopic(formData);
        toast.success("Thêm chủ đề thành công!");
        form.resetFields();
        setFileList([]);
        onClose();
      } catch (error) {
        console.error("❌ API lỗi:", error.response?.data || error);
        toast.error("Thêm chủ đề thất bại!");
      }
    });
  };

  const handleChange = ({ fileList }) => {
    const file = fileList[0]?.originFileObj;
    if (file && !file.type.startsWith("video/")) {
      toast.error("Chỉ được chọn file video!");
      return;
    }
    setFileList(fileList);
  };

  return (
    <Modal title="Thêm Chủ Đề Mới" open={visible} onCancel={onClose} footer={null}>
      <Form form={form} layout="vertical">
        <Form.Item label="Số thứ tự" name="srNo" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Tên chủ đề" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Mô tả" name="description">
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item label="Tải lên video">
          <Upload
            fileList={fileList}
            beforeUpload={() => false}
            onChange={handleChange}
            accept="video/*"
            maxCount={1}
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
