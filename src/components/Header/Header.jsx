import React, { useContext, useEffect, useState } from "react";
import { Layout, Row, Col, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { UserHeaderAuth } from "./UserHeaderAuth";
import "./styles.css";
import { AuthContext } from "../../context/AuthProvider";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("jwtToken"));
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // Lắng nghe sự thay đổi trong localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("jwtToken"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <Layout.Header className="site-header">
      <Row className="header-container" align="middle" justify="space-between" wrap={false}>
        <Col className="logo-section" onClick={() => navigate("/home")}>
          <Space size={16} className="logo-clickable">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e02fb6c9a7eecac5c023060dfa3e98a94c7cbb6ce9c3a4b435fa8f0383a8586d"
              alt="Giant Wisdom Logo"
              className="logo-image"
            />
            <span className="logo-text">Giant<br />Wisdom</span>
          </Space>
        </Col>

        <Col flex="auto" style={{ padding: '0 24px' }}>
          <Space size="large">
            <span onClick={() => navigate("/home")} className="nav-item">Trang chủ</span>
            <span onClick={() => navigate("/categories")} className="nav-item">Khóa học</span>
            <span onClick={() => navigate("/faq")} className="nav-item">Hỏi đáp</span>
            <span onClick={() => navigate("/policy")} className="nav-item">Chính sách</span>
            <span onClick={() => navigate(`/${user.id}/rating`)} className="nav-item">Đánh giá khóa học</span>
          </Space>
        </Col>

        <Col className="nav-item" onClick={() => navigate("/categories")}>
          <span>Danh sách khóa học</span>
        </Col>

        <Col>
          <UserHeaderAuth /> 
        </Col>
      </Row>
      <div className="header-divider" />
    </Layout.Header>
  );
};

export default Header;
