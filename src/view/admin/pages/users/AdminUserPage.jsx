import React, { use, useEffect } from "react";
import { Card, Typography } from "antd";
import UserFilter from "./UserFilter";
import UserTable from "./UserTable";
import userApi from "../../../../api/userApi";
import "./styles.css"; // Đừng quên import CSS

const { Title } = Typography;

const AdminUserPage = () => {
  const [userList, setUserList] = React.useState([]);

  // Fetch user list from API
  const fetchUserList = async () => {
    try {
      const response = await userApi.fetchAllUsers();
      setUserList(response.data.users);
    } catch (error) {
      console.error("Error fetching user list:", error);
    }
  };

  useEffect(() => {
    fetchUserList();
  }, [userList.length]);

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Quản lý người dùng</Title>
      <Card style={{ marginTop: 24 }}>
        <UserFilter />
        <UserTable users={userList} />
      </Card>
    </div>
  );
};

export default AdminUserPage;
