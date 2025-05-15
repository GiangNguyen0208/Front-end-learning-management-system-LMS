import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getAuth, confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";
import { Card, Input, Button, Typography, message } from "antd";
import { toast } from "react-toastify";
import authApi from "../../../../api/authApi";

const { Title, Text } = Typography;

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState("");
  const [verified, setVerified] = useState(false);
  const [status, setStatus] = useState("loading");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();


   const verify = async () => {
    try {
      if (!token) {
        setStatus("invalid");
        return;
      }

      const res = await authApi.verifyResetToken(token);
      if (res.email) {
        setEmail(res.email);
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("API Error:", error);
      setStatus("error");
    }
  };


  useEffect(() => {
    if (!token) {
      setStatus("invalid");
      return;
    }
    verify();
  }, [token]);

  const handleResetPassword = async () => {
    if (!newPassword || newPassword.length < 6) {
      return toast.warning("Mật khẩu phải có ít nhất 6 ký tự.");
    }

    setLoading(true);
    try {
      const res = await authApi.resetPassword(token, newPassword);
      if (res.success) {
        toast.success("Đặt lại mật khẩu thành công. Vui lòng đăng nhập lại.");
        navigate("/login");
      } else {
        toast.error("Đặt lại mật khẩu thất bại. Vui lòng thử lại.");
      }
    } catch (err) {
      console.error("Reset password failed", err);
      toast.error("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") return <p>Đang kiểm tra token...</p>;
  if (status === "invalid") return <p>Token không hợp lệ hoặc đã hết hạn.</p>;

  return (
    <div style={{ maxWidth: 400, margin: "60px auto", padding: "0 20px" }}>
      <Card>
        <Title level={3} style={{ textAlign: "center" }}>
          Nhập mật khẩu mới
        </Title>
        <Text>Cho tài khoản: {email}</Text>
        <Input.Password
          placeholder="Mật khẩu mới"
          style={{ marginTop: 16 }}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Button
          type="primary"
          block
          style={{ marginTop: 16 }}
          loading={loading}
          onClick={handleResetPassword}
        >
          Xác nhận đổi mật khẩu
        </Button>
      </Card>
    </div>
  );
};

export default ResetPassword;
