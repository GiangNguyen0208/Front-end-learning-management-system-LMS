import React from "react";
import { Form, Input, Select } from "antd";
import { DownOutlined } from "@ant-design/icons";
import "./ProfileForm.css";

const { TextArea } = Input;
const { Option } = Select;

function ProfileForm() {
  return (
    <div className="profile-form-container">
      <Form layout="vertical" className="profile-form">
        <div className="name-row">
          <Form.Item
            label="First Name"
            name="firstName"
            className="form-item-half"
          >
            <Input placeholder="Label" className="form-input" />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
            className="form-item-half"
          >
            <Input placeholder="Label" className="form-input" />
          </Form.Item>
        </div>

        <Form.Item
          label="Headline"
          name="headline"
          className="form-item-headline"
        >
          <Input placeholder="Label" className="form-input" />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <TextArea placeholder="Label" className="form-textarea" rows={4} />
        </Form.Item>

        <Form.Item
          label="Language"
          name="language"
          className="form-item-language"
        >
          <Select
            placeholder="Label"
            className="form-select"
            defaultValue="Vietnamese"
            suffixIcon={<DownOutlined />}
          >
            <Option value="vietnamese">Vietnamese</Option>
            <Option value="english">English</Option>
            <Option value="spanish">Spanish</Option>
            <Option value="french">French</Option>
          </Select>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ProfileForm;
