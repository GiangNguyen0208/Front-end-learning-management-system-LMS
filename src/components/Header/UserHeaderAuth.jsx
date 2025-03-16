import React, { useContext } from "react";
import { Space, Dropdown, Button, Avatar } from "antd";
import { UserOutlined, LogoutOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

export const UserHeaderAuth = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext); // Lấy user & logout từ Context

  // Menu Dropdown khi bấm vào Avatar user
  const menuItems = [
    { key: "profile", label: "Trang cá nhân", onClick: () => navigate("/info-user") },
    { key: "orders", label: "Đơn hàng", onClick: () => navigate("/orders") },
    { key: "logout", label: "Đăng xuất", icon: <LogoutOutlined />, onClick: logout },
  ];

  return (
    <Space size={16}>
      {/* Nếu chưa đăng nhập, hiển thị nút Login */}
      {!user ? (
        <>
          <Button onClick={() => navigate("/login")}>Đăng nhập</Button>
          <Button type="primary" onClick={() => navigate("/sign-up")}>Đăng ký</Button>
        </>
      ) : (
        <>
          {/* Biểu tượng giỏ hàng */}
          <ShoppingCartOutlined
            style={{ fontSize: 22, cursor: "pointer" }}
            onClick={() => navigate("/shopping-cart")}
          />

          {/* Avatar + Dropdown menu */}
          <Dropdown
            menu={{ items: menuItems }}
            trigger={["click"]}
          >
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
