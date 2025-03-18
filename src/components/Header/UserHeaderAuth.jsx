import React, { useContext } from "react";
import { Space, Dropdown, Button, Avatar, Col } from "antd";
import { UserOutlined, LogoutOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

export const UserHeaderAuth = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext); // Lấy user & logout từ Context

  // Menu Dropdown khi bấm vào Avatar user
  const menuItems = [
    { key: "profile", label: "Trang cá nhân", onClick: () => navigate("/info-user") },
    { key: "orders", label: "Đơn hàng", onClick: () => navigate("/shopping-cart") },
    user?.role === "Mentor" && { key: "mentor", label: "Giảng Viên", onClick: () => navigate("/mentor/dashboard") },
    { key: "logout", label: "Đăng xuất", icon: <LogoutOutlined />, onClick: logout },
  ].filter(Boolean); // Loại bỏ các phần tử falsy (null, undefined, false, "")

  return (
    <Space size={16}>
      {!user ? (
        <>
          <Button onClick={() => navigate("/login")}>Đăng nhập</Button>
          <Button type="primary" onClick={() => navigate("/sign-up")}>Đăng ký</Button>
        </>
      ) : (
        <>
          {user?.role !== "Mentor" && (
            <Col className="nav-item" onClick={() => navigate("/sign-up-mentor")}>
              <span style={{ color: "blue", cursor: "pointer" }}>Tham gia giảng dạy</span>
            </Col>
          )}

          <ShoppingCartOutlined
            style={{ fontSize: 22, cursor: "pointer" }}
            onClick={() => navigate("/shopping-cart")}
          />

          <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
            <Avatar
              size="large"
              icon={<UserOutlined />}
              style={{ cursor: "pointer", backgroundColor: "#87d068" }}
            />
          </Dropdown>
        </>
      )}
    </Space>
  );
};
