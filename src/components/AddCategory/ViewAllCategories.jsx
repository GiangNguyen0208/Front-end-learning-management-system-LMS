import { useState } from "react";
import {
  Table,
  Button,
  Card,
  Tooltip,
  Space,
  Typography,
  Popconfirm,
  Skeleton,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Paragraph } = Typography;

const ViewAllCategories = () => {
  const [allCategories] = useState([
    { id: 1, name: "Web Development", description: "Courses on web technologies" },
    { id: 2, name: "Data Science", description: "Learn about data analysis and AI" },
    { id: 3, name: "Cyber Security", description: "Protect networks and systems" },
  ]);
  const [loading] = useState(false); // Bạn có thể set thành true nếu muốn mô phỏng loading

  const navigate = useNavigate();

  const updateCategory = (category) => {
    navigate("/admin/course/category/update", { state: category });
  };

  const deleteCategory = (id) => {
    // Logic xóa, ví dụ: gọi API rồi cập nhật state
    console.log("Xóa danh mục có id:", id);
  };

  const addCategory = () => {
    navigate("/admin/course/category/add");
  };

  const columns = [
    {
      title: <div style={{ fontWeight: 600 }}>🆔 Mã danh mục</div>,
      dataIndex: "id",
      width: 100,
    },
    {
      title: <div style={{ fontWeight: 600 }}>📂 Tên danh mục</div>,
      dataIndex: "name",
      width: 200,
      render: (text) => (
        <span style={{ fontWeight: 500, whiteSpace: "nowrap" }}>{text}</span>
      ),
    },
    {
      title: <div style={{ fontWeight: 600 }}>📝 Mô tả</div>,
      dataIndex: "description",
      render: (text) => (
        <Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: 0 }}>
          {text}
        </Paragraph>
      ),
    },
    {
      title: <div style={{ fontWeight: 600 }}>⚙️ Hành động</div>,
      key: "action",
      width: 220,
      render: (_, record) => (
        <Space wrap>
          <Tooltip title="Cập nhật danh mục">
            <Button
              icon={<EditOutlined />}
              type="primary"
              onClick={() => updateCategory(record)}
            >
              Sửa
            </Button>
          </Tooltip>

          <Popconfirm
            title="Bạn có chắc chắn muốn xóa danh mục này?"
            onConfirm={() => deleteCategory(record.id)}
            okText="Có"
            cancelText="Không"
          >
            <Tooltip title="Xóa danh mục">
              <Button
                icon={<DeleteOutlined />}
                type="primary"
                danger
              >
                Xóa
              </Button>
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card
      title="📚 Danh sách danh mục"
      extra={
        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={addCategory}
          style={{
            backgroundColor: "#1890ff",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          Thêm danh mục
        </Button>
      }
      style={{
        maxWidth: "1100px",
        margin: "auto",
        marginTop: 30,
        borderRadius: 12,
        border: "1px solid #d9d9d9",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      }}
    >
      {loading ? (
        <Skeleton active paragraph={{ rows: 5 }} />
      ) : (
        <Table
          dataSource={allCategories}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          bordered
          style={{ borderRadius: 8 }}
        />
      )}
    </Card>
  );
};

export default ViewAllCategories;
