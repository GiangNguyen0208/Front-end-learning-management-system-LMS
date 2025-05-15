import { Table, Tag, Avatar, Button, Tooltip } from "antd";
import { EyeOutlined, EditOutlined, StopOutlined } from "@ant-design/icons";
import React from "react";
import { formatDate } from "../../../../utils/helper/formatDate";


const UserTable = ({ users, onViewDetail, onUpdateUser, onBanUser }) => {
  const handleUpdate = (user) => {
    onUpdateUser?.(user);
  };

  const handleBan = (user) => {
    onBanUser?.(user);
  };

  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (avatar) => <Avatar src={avatar} shape="circle" />,
    },
    {
      title: "Họ tên",
      key: "fullName",
      render: (_, record) => `${record.firstName} ${record.lastName}`,
    },
    {
      title: "Email",
      dataIndex: "emailId",
      key: "emailId",
    },
    {
      title: "SĐT",
      dataIndex: "phoneNo",
      key: "phoneNo",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      render: (role) => <Tag color="geekblue">{role.toUpperCase()}</Tag>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const color =
          status === "active" ? "green" : status === "inactive" ? "orange" : "red";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => formatDate(createdAt),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <div className="action-buttons">
          <Tooltip title="Xem chi tiết">
            <Button type="link" icon={<EyeOutlined />} onClick={() => onViewDetail(record)} />
          </Tooltip>
          <Tooltip title="Cập nhật">
            <Button type="link" icon={<EditOutlined />} onClick={() => handleUpdate(record)} />
          </Tooltip>
          <Tooltip title="Ban">
            <Button type="link" icon={<StopOutlined />} danger onClick={() => handleBan(record)} />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div className="user-table-container">
      <Table
        columns={columns}
        dataSource={users}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        rowClassName="custom-row"
      />
    </div>
  );
};

export default UserTable;
