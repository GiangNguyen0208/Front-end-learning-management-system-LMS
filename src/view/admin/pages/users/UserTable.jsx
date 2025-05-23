import { Table, Tag, Avatar, Button, Tooltip, Popconfirm, Space } from "antd";
import { EyeOutlined, EditOutlined, StopOutlined, DeleteOutlined, TeamOutlined } from "@ant-design/icons";
import React from "react";
import { formatDate } from "../../../../utils/helper/formatDate";
import { URL } from "../../../../api/constant";


const UserTable = ({ users, onViewDetail, onUpdateUser, onBanUser }) => {
  const handleUpdate = (user) => {
    onUpdateUser?.(user);
  };

  const handleBan = (user) => {
    onBanUser?.(user);
  };

  const viewStudents = (user) => {
    onViewDetail?.(user);
  }

  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (_, record) => <Avatar src={`${URL.BASE_URL}/user/${record.avatar}`} shape="circle" />,
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
        <Space wrap>
          <Tooltip title="Cập nhật nguoiời dùng">
            <Button
              icon={<EditOutlined />}
              onClick={() => handleUpdate(record)}
              type="primary"
            >
              Cập nhật
            </Button>
          </Tooltip>

          <Tooltip title="Xem chi tiết học viên">
            <Button
              icon={<TeamOutlined />}
              style={{ backgroundColor: "#722ed1", borderColor: "#722ed1" }}
              type="primary"
              onClick={() => viewStudents(record)}
            >
              Xem học viên
            </Button>
          </Tooltip>

          <Popconfirm
            title="Bạn có chắc muốn khóa tài khoản này?"
            onConfirm={() => handleBan(record.id)}
            okText="Có"
            cancelText="Không"
          >
            <Tooltip title="Khóa tài khoản">
              <Button
                icon={<DeleteOutlined />}
                type="primary"
                danger
              >
                Khóa
              </Button>
            </Tooltip>
          </Popconfirm>
        </Space>
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
