import React, { useContext } from "react";
import { Avatar, Button, Menu, Divider } from "antd";
import {
  ShareAltOutlined,
  UserOutlined,
  BookOutlined,
  TeamOutlined,
  MessageOutlined,
  StarOutlined,
} from "@ant-design/icons";
import "./ProfileSidebar.css";
import { AuthContext } from "../../../../../context/AuthProvider";

function ProfileSidebar({ setSelectedMenu, selectedMenu }) {
  const { user } = useContext(AuthContext);

  return (
    <div className="profile-sidebar-container">
      <div className="profile-header">
        <Avatar
          size={100}
          src={`${URL.BASE_URL}/user/${user.avatar}`}
          className="profile-avatar"
        />
        <h3 className="profile-name">{`${user.firstName || ""} ${user.lastName || ""}`}</h3>
        <Button
          className="share-profile-button"
          icon={<ShareAltOutlined />}
          type="primary"
          ghost
        >
          Chia sẻ hồ sơ
        </Button>
      </div>

      <Divider style={{ borderColor: "#1e293b", margin: "16px 0" }} />

      <Menu
        mode="inline"
        selectedKeys={[selectedMenu]}
        onClick={({ key }) => setSelectedMenu(key)}
        className="profile-menu"
      >
        <Menu.Item key="profile" icon={<UserOutlined />} className="profile-menu-item">
          Thông tin cá nhân
        </Menu.Item>
        <Menu.Item key="courses" icon={<BookOutlined />} className="profile-menu-item">
          Danh sách khóa học
        </Menu.Item>
        <Menu.Item key="teachers" icon={<TeamOutlined />} className="profile-menu-item">
          Giảng viên
        </Menu.Item>
        <Menu.Item key="message" icon={<MessageOutlined />} className="profile-menu-item">
          Thảo luận
        </Menu.Item>
        <Menu.Item key="reviews" icon={<StarOutlined />} className="profile-menu-item">
          Đánh giá
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default ProfileSidebar;
