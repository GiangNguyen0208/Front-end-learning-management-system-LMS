import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
    DashboardOutlined,
    BookOutlined,
    UnorderedListOutlined,
    SettingOutlined,
    UserOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    WechatOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    const menuItems = [
        { key: "dashboard", label: "Dashboard", icon: <DashboardOutlined />, path: "/admin/dashboard" },
        { key: "users", label: "Users", icon: <UserOutlined />, path: "/admin/users" },
        { key: "courses", label: "Courses", icon: <BookOutlined />, path: "/admin/courses" },
        { key: "categories", label: "Category", icon: <UnorderedListOutlined />, path: "/admin/categories" },
        { key: "communication", label: "Communication", icon: <WechatOutlined />, path: "/admin/communication" },
        { key: "settings", label: "Settings", icon: <SettingOutlined />, path: "/admin/settings" },
    ];

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)} style={{ minHeight: "100vh" }}>
            <div style={{
                height: 64,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                fontWeight: "bold",
                color: "#fff",
                background: "#001529",
                marginBottom: 10,
            }}>
                {collapsed ? "A" : "Admin"}
            </div>
            
            <Menu
                theme="dark"
                mode="inline"
                selectedKeys={[location.pathname]}
                items={menuItems.map(({ key, label, icon, path }) => ({
                    key,
                    icon,
                    label: <Link to={path}>{label}</Link>,
                }))}
            />

            <div style={{ textAlign: "center", padding: 10 }}>
                <button onClick={() => setCollapsed(!collapsed)} style={{
                    background: "transparent",
                    border: "none",
                    color: "#fff",
                    fontSize: 18,
                    cursor: "pointer",
                }}>
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </button>
            </div>
        </Sider>
    );
}
