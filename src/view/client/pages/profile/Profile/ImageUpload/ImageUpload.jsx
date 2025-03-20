import React from "react";
import { Upload, Button, Input } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./ImageUpload.css";

function ImageUpload() {
  return (
    <div className="image-upload-container">
      <h3 className="section-title">Image Preview</h3>

      <div className="image-preview-box">
        <div className="image-placeholder">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/7c50ea7090888fbd0b90405dfdb8c1bb9f887372c34e37c40fdfe7569da936aa?placeholderIfAbsent=true&apiKey=91edb325cc2b4ce5940b1638fa283b2c"
            alt="Upload placeholder"
            className="placeholder-icon"
          />
        </div>
      </div>

      <h3 className="section-title upload-title">Add/Change Image</h3>

      <div className="upload-controls">
        <Input placeholder="Label" className="file-input" />
        <Button className="upload-button">Upload Image</Button>
      </div>

      <Button type="primary" className="save-button">
        Save Image
      </Button>
    </div>
  );
}

export default ImageUpload;
