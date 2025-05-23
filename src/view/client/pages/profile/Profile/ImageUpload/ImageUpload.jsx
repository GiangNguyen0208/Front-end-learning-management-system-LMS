import React, { useState, useContext } from "react";
import { Upload, Button, Form, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { URL } from "../../../../../../api/constant";
import userApi from "../../../../../../api/userApi";
import { AuthContext } from "../../../../../../context/AuthProvider";
import "./ImageUpload.css";

function ImageUpload({ user }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const { setUser } = useContext(AuthContext);

  const handleBeforeUpload = (file) => {
    const preview = window.URL.createObjectURL(file);
    setSelectedFile(file);
    setPreviewUrl(preview);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.warning("Vui lòng chọn một ảnh.");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", selectedFile);

    try {
      setLoading(true);
      const response = await userApi.uploadAvatar(user.id, formData);
      if (response.success && response.user?.avatar) {
        toast.success("Ảnh đại diện đã được cập nhật.");

        const updatedUser = { ...user, avatar: response.user.avatar };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        if (setUser) setUser(updatedUser);

        // Sau khi upload thành công, không xoá preview ngay
        // setSelectedFile(null); // Gỡ nếu muốn giữ preview sau upload
        // setPreviewUrl(null);
      } else {
        toast.error("Upload thất bại.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Đã xảy ra lỗi khi upload.");
    } finally {
      setLoading(false);
    }
  };

  const getImageSrc = () => {
    if (previewUrl) return previewUrl;
    if (user.avatar) return `${URL.BASE_URL}/user/avatar/${user.avatar}`;
    return "/default-avatar.png";
  };

  return (
    <div className="image-upload-container">
      <h3 className="section-title">Xem trước ảnh đại diện</h3>

      <div className="image-preview-box">
        <img
          src={getImageSrc()}
          alt="Avatar"
          className="placeholder-icon"
        />
      </div>

      <h3 className="section-title upload-title">Thêm hoặc thay đổi ảnh</h3>

      <Form layout="vertical">
        <Form.Item label="Ảnh đại diện">
          <Upload
            beforeUpload={handleBeforeUpload}
            maxCount={1}
            showUploadList={false}
            accept="image/*"
          >
            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
          </Upload>
        </Form.Item>

        <Button
          type="primary"
          className="save-button"
          onClick={handleUpload}
          loading={loading}
        >
          Lưu ảnh
        </Button>
      </Form>
    </div>
  );
}

export default ImageUpload;
