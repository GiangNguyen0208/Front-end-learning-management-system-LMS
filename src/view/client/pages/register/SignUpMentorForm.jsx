import React, { useContext, useState } from "react";
import { Form, Input, Button, Row, Col, Upload, message, InputNumber, Select } from "antd";
import { UploadOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import authApi from "../../../../api/authApi";
import { AuthContext } from "../../../../context/AuthProvider";
import { toast } from "react-toastify";

const { Option } = Select;

const SignUpMentorForm = () => {
  const navigate = useNavigate();
  const { user, setUser, logout } = useContext(AuthContext);
  const [form] = Form.useForm();
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  if (!user) {
    message.error("User chưa đăng nhập hoặc chưa được khởi tạo.");
    return;
  }

  const onFinish = async (values) => {
    try {
      const mentorData = {
        age: values.age,
        bio: values.bio,
        highestQualification: values.highestQualification,
        profession: values.profession,
        experience: values.experience,
        languageCertificate: values.languageCertificate, // 🆕 Bằng cấp ngôn ngữ
        degreeLevel: values.degreeLevel, // 🆕 Bậc cấp
        mentorId: Number(user.id),
        profilePic: selectedProfile,
        selectedCertificate: selectedCertificate, // 🆕 File chứng chỉ
      };

      const response = await authApi.registerMentor(mentorData, user, setUser);

      if (response.success) {
        toast.success("Đăng ký Mentor thành công!");
        logout()
        setTimeout(() => toast.info("Vui lòng đăng nhập lại"), 1500);
        // setTimeout(() => navigate("/home"), 1000);
      } else {
        toast.error(response.responseMessage || "Đăng ký thất bại. Kiểm tra thông tin!");
      }
    } catch (error) {
      toast.error(`Lỗi đăng ký: ${error.response?.data?.message || error.message}`);
      console.error("❌ Lỗi đăng ký:", error);
    }
  };

  return (
    <div className="signup-form-container">
      <h1 className="signup-title">Đăng Ký Mentor</h1>

      <Form form={form} name="signup" onFinish={onFinish} layout="vertical" className="signup-form">
        <Row gutter={30}>
          <Col xs={24} sm={12}>
            <Form.Item label="Tuổi" name="age" rules={[{ required: true, message: "Hãy nhập tuổi!" }]}>
              <InputNumber min={18} max={100} placeholder="Tuổi" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Kinh nghiệm (năm)"
              name="experience"
              rules={[{ required: true, message: "Hãy nhập số năm kinh nghiệm!" }]}
            >
              <InputNumber min={0} max={50} placeholder="Số năm kinh nghiệm" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Bằng cấp cao nhất" name="highestQualification" rules={[{ required: true, message: "Hãy chọn bằng cấp!" }]}>
          <Select placeholder="Chọn bằng cấp">
            <Option value="B Tech">B Tech</Option>
            <Option value="B Pharm">B Pharm</Option>
            <Option value="M Tech">M Tech</Option>
            <Option value="PhD">PhD</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Bằng cấp ngôn ngữ" name="languageCertificate" rules={[{ required: true, message: "Hãy chọn bằng cấp ngôn ngữ!" }]}>
          <Select placeholder="Chọn bằng cấp ngôn ngữ">
            <Option value="IELTS">IELTS</Option>
            <Option value="TOEFL">TOEFL</Option>
            <Option value="JLPT">JLPT</Option>
            <Option value="TOPIK">TOPIK</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Bậc cấp" name="degreeLevel" rules={[{ required: true, message: "Hãy chọn bậc cấp!" }]}>
          <Select placeholder="Chọn bậc cấp">
            <Option value="A1">A1</Option>
            <Option value="A2">A2</Option>
            <Option value="B1">B1</Option>
            <Option value="B2">B2</Option>
            <Option value="C1">C1</Option>
            <Option value="C2">C2</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Nghề nghiệp" name="profession" rules={[{ required: true, message: "Hãy nhập nghề nghiệp!" }]}>
          <Input placeholder="Nghề nghiệp" />
        </Form.Item>

        <Form.Item label="Tiểu sử" name="bio" rules={[{ required: true, message: "Hãy nhập tiểu sử!" }]}>
          <Input.TextArea rows={4} placeholder="Viết đôi lời giới thiệu về bản thân..." />
        </Form.Item>

        <Form.Item label="Ảnh đại diện">
          <Upload beforeUpload={(file) => { setSelectedProfile(file); return false; }} maxCount={1}>
            <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
          </Upload>
        </Form.Item>

        <Form.Item label="Chứng chỉ ngôn ngữ">
          <Upload beforeUpload={(file) => { setSelectedCertificate(file); return false; }} maxCount={1}>
            <Button icon={<UploadOutlined />}>Tải chứng chỉ lên</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="create-account-btn">
            Tạo tài khoản <ArrowRightOutlined />
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUpMentorForm;
