import React, { useContext } from "react";
import { Form, Input, Button, Typography, Divider, message } from "antd";
import { ArrowRightOutlined, MailOutlined, LockOutlined, GooglePlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import authApi from "../../../../api/authApi";
import { AuthContext } from "../../../../context/AuthProvider";

const { Title, Text } = Typography;

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const onFinish = async (values) => {
    try {
      const response = await authApi.login(values);

      if (response.success && response.jwtToken) {
        login(response.jwtToken, response.user);
        message.success("Login successful!");
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else {
        message.error(response.responseMessage || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      message.error("Error connecting to server. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        
        <Text type="secondary">Please enter your login details below</Text>

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
          <div className="social-login-container">
            <div className="social-button">
              <GooglePlusOutlined style={{ fontSize: "20px", color: "#db4437" }} />
              Continue with Google
            </div>

            <div className="register-link">
              <Text type="secondary">Don’t have an account?</Text>
              <Button
                type="link"
                onClick={() => navigate("/register")}
                className="register-button"
              >
                Create Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
