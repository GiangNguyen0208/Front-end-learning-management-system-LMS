import React from "react";
import { Form, Input, Button, message } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import authApi from "../../../../api/authApi";
import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthProvider";

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // ✅ Lấy hàm login từ Context

  const onFinish = async (values) => {
    try {
      const response = await authApi.login(values);

      if (response.success && response.jwtToken) {
        // ✅ Gọi login() để cập nhật context
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
    <Form name="login" layout="vertical" onFinish={onFinish}>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, type: "email", message: "Enter your email!" }]}
      >
        <Input placeholder="Enter Email" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Enter your password!" }]}
      >
        <Input.Password placeholder="Enter Password" />
      </Form.Item>

      <Button type="primary" htmlType="submit" icon={<ArrowRightOutlined />} block>
        Sign In
      </Button>
    </Form>
  );
};

export default LoginForm;
