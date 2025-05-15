// pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Input, Button, message, Card, Typography } from "antd";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import userApi from "../../../../api/userApi";
import authApi from "../../../../api/authApi";

const { Title, Text } = Typography;

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!email) {
      return message.warning("Vui lòng nhập email!");
    }

    setLoading(true);
    try {
      const response = await authApi.forgotPassword(email);
      console.log(response.responseMessage);
      toast.success("Email đặt lại mật khẩu đã được gửi. Vui lòng kiểm tra hộp thư.");
      setEmail("");
    } catch (error) {
      console.error("Lỗi gửi email:", error);
      toast.error("Không thể gửi email. Vui lòng kiểm tra địa chỉ email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "60px auto",
        padding: "0 20px",
      }}
    >
      <Card>
        <Title level={3} style={{ textAlign: "center" }}>
          Quên mật khẩu
        </Title>
        <Text>Nhập địa chỉ email của bạn để nhận link đặt lại mật khẩu.</Text>
        <Input
          placeholder="Nhập email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginTop: 16 }}
        />
        <Button
          type="primary"
          block
          style={{ marginTop: 16 }}
          loading={loading}
          onClick={handleReset}
        >
          Gửi link đặt lại mật khẩu
        </Button>
      </Card>
    </div>
  );
};

export default ForgotPassword;
