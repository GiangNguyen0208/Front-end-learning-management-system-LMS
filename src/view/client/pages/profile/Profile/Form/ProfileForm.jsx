import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import "./ProfileForm.css";
import { toast } from "react-toastify";
import userApi from "../../../../../../api/userApi";

const { TextArea } = Input;

function ProfileForm({ user, onUpdateProfile }) {
  const [passwordForm] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = async (values) => {
    const { oldPassword, newPassword, confirmNewPassword } = values;

    console.log("UserID ", user.id);
    

    if (newPassword !== confirmNewPassword) {
      toast.error("Mật khẩu mới và xác nhận mật khẩu không khớp.");
      return;
    }

    setLoading(true);
    try {
      // Gọi API đổi mật khẩu ở đây, ví dụ:
      await userApi.changePassword(user.id, oldPassword, newPassword);
      toast.success("Đổi mật khẩu thành công.");
      passwordForm.resetFields();
    } catch (error) {
      message.error(error.message || "Đổi mật khẩu thất bại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-form-container">
      <Form
        layout="vertical"
        className="profile-form"
        initialValues={{
          firstName: user.firstName,
          lastName: user.lastName,
          headline: user.headline,
          jobTitle: user?.mentorDetail?.profession,
          description: user?.mentorDetail?.bio,
          language: "vietnamese",
        }}
        onFinish={onUpdateProfile} // Hàm cập nhật profile truyền từ props
      >
        <div className="name-row">
          <Form.Item
            label="First Name"
            name="firstName"
            className="form-item-half"
          >
            <Input placeholder="First Name" className="form-input" />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
            className="form-item-half"
          >
            <Input placeholder="Last Name" className="form-input" />
          </Form.Item>
        </div>

        <Form.Item
          label="Job Title"
          name="jobTitle"
          className="form-item-job-title"
        >
          <Input
            placeholder="Job Title"
            className="form-input"
            disabled={!(user.role === "Mentor" || user.role === "Admin")}
          />
        </Form.Item>

        {user.role === "Mentor" && (
          <Form.Item label="Description" name="description">
            <TextArea
              placeholder="Bio"
              className="form-textarea"
              rows={4}
            />
          </Form.Item>
        )}
      </Form>

      {/* Phần đổi mật khẩu */}
      <div style={{ marginTop: 40, maxWidth: 400, marginLeft: "auto", marginRight: "auto" }}>
        <h3>Đổi mật khẩu</h3>
        <Form
          form={passwordForm}
          layout="vertical"
          onFinish={handlePasswordChange}
        >
          <Form.Item
            label="Mật khẩu hiện tại"
            name="oldPassword"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu hiện tại" }]}
          >
            <Input.Password placeholder="Mật khẩu hiện tại" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu mới"
            name="newPassword"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu mới" },
              { min: 6, message: "Mật khẩu mới phải ít nhất 6 ký tự" },
            ]}
          >
            <Input.Password placeholder="Mật khẩu mới" />
          </Form.Item>

          <Form.Item
            label="Xác nhận mật khẩu mới"
            name="confirmNewPassword"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: "Vui lòng xác nhận mật khẩu mới" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Mật khẩu xác nhận không khớp'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Xác nhận mật khẩu mới" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Đổi mật khẩu
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default ProfileForm;
