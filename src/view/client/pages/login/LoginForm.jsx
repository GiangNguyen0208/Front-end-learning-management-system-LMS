import React, { useContext, useState } from "react";
import { Form, Input, Button, Typography, Divider, message } from "antd";
import { ArrowRightOutlined, MailOutlined, LockOutlined, GooglePlusOutlined, FacebookFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import authApi from "../../../../api/authApi";
import { AuthContext } from "../../../../context/AuthProvider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addDocument, generateKeywords } from "../../../../firebase/services";
import { FacebookAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

const { Title, Text } = Typography;

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      const response = await authApi.login(values);

      if (response.success && response.jwtToken) {
        login(response.jwtToken, response.user);
        toast.success("Đăng nhập thành công!");
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else {
        toast.error(response.responseMessage || "Đăng nhập thất bại, Vui lòng thử lại!");
      }
    } catch (error) {
      toast.error("Lỗi khi đăng nhập, Vui lòng thử lại!");
      console.error(error);
    }
  };

  const GOOGLE_AUTH_URL = "http://localhost:8080/oauth2/authorization/google";

  const handleFacebookLogin = async () => {
    const provider = new FacebookAuthProvider();
    const auth = getAuth();
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const { user } = result;

      if (user) {
        // Lưu vào Firestore nếu là người dùng mới
        await addDocument("users", {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid,
          providerId: user.providerId,
          keywords: generateKeywords(user.displayName?.toLowerCase() || ""),
        });

        toast.success(`Chào mừng ${user.displayName}!`);
        // Sau khi đăng nhập thành công, chuyển hướng hoặc xử lý tiếp
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      }
    } catch (error) {
      console.error("Lỗi đăng nhập Facebook:", error);
      toast.error("Đăng nhập bằng Facebook thất bại!");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = GOOGLE_AUTH_URL;
  };

  return (
    <div className="login-container">
      <div className="login-content">
        
        <Text type="secondary">Vui lòng điền thông tin đăng nhập</Text>

        <div className="login-form-container">
          <Form
            name="login"
            layout="vertical"
            onFinish={onFinish}
            className="login-form"
          >
            
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, type: "email", message: "Enter your email!" }]}
            >
              <Input
                prefix={<MailOutlined style={{ color: "#94a3b8" }} />}
                placeholder="Enter Email"
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Enter your password!" }]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: "#94a3b8" }} />}
                placeholder="Enter Password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                icon={<ArrowRightOutlined />}
                block
                className="login-button"
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>
          <div className="divider-container">
            <Divider className="login-divider">or continue with</Divider>
          </div>
          <div className="social-login-container" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Button
              style={{ backgroundColor: "#db4437", color: "#fff" }}
              icon={<GooglePlusOutlined />}
              onClick={handleGoogleLogin}
              loading={loading}
              block
            >
              Đăng nhập bằng Google
            </Button>

            <Button
              style={{ backgroundColor: "#1877f2", color: "#fff" }}
              icon={<FacebookFilled />}
              onClick={handleFacebookLogin}
              loading={loading}
              block
            >
              Đăng nhập bằng Facebook
            </Button>
          </div>

          <div className="register-link" style={{ marginTop: 24 }}>
            <Text type="secondary">Không có tài khoản?</Text>
            <Button type="link" onClick={() => navigate("/sign-up")} className="register-button">
              Tạo tài khoản
            </Button>
          </div>

          <div style={{ marginTop: 16, textAlign: "center" }}>
            <a href="/forgot-password">Quên mật khẩu?</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
