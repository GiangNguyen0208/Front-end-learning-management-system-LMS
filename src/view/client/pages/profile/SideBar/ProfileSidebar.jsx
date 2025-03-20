import React from "react";
import { Avatar, Button, Menu, Divider } from "antd";
import { ShareAltOutlined } from "@ant-design/icons";
import "./ProfileSidebar.css";

function ProfileSidebar({ setSelectedMenu }) {
  return (
    <div className="profile-sidebar">
      <div className="profile-info">
        <Avatar
          size={160}
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/7d94d9b88bb96b4a9e4eeaa2192edd434bbf8b85afada51599673490f0386351?placeholderIfAbsent=true&apiKey=91edb325cc2b4ce5940b1638fa283b2c"
          className="profile-avatar"
        />
        <h2 className="profile-name">John Doe</h2>
        <Button className="share-button" icon={<ShareAltOutlined />}>
          Share Profile
        </Button>
      </div>

      <Divider className="profile-divider" />

      <Menu
        className="profile-menu"
        mode="vertical"
        onClick={(e) => setSelectedMenu(e.key)}
        items={[
          {
            key: "profile",
            label: "Profile",
            className: "menu-item-profile",
          },
          {
            key: "courses",
            label: "My Courses",
            className: "menu-item",
          },
          {
            key: "teachers",
            label: "Teachers",
            className: "menu-item",
          },
          {
            key: "message",
            label: "Message",
            className: "menu-item",
          },
          {
            key: "reviews",
            label: "My Reviews",
            className: "menu-item-last",
          },
        ]}
      />
    </div>
  );
}

export default ProfileSidebar;