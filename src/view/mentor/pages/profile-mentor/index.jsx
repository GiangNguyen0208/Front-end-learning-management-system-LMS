import React, { useContext, useEffect, useState } from 'react';
import {
  Card, Row, Col, Typography, Avatar, Tag, Rate, Divider, Button, Image,
  Modal, Form, InputNumber, Select, Upload, Input
} from 'antd';
import {
  BookOutlined, TeamOutlined, StarFilled, UploadOutlined
} from '@ant-design/icons';
import { AuthContext } from '../../../../context/AuthProvider';
import userApi from '../../../../api/userApi';
import { toast } from 'react-toastify';
import { URL } from '../../../../api/constant';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../firebase/config';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const MentorProfilePage = () => {
  const { user, userFireBase } = useContext(AuthContext);
  const [mentor, setMentor] = useState(null);
  const [certificateUrl, setCertificateUrl] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [form] = Form.useForm();

  const showUpdateModal = () => {
    form.setFieldsValue({
      age: mentor.mentorDetail.age,
      bio: mentor.mentorDetail.bio,
      highestQualification: mentor.mentorDetail.highestQualification,
      profession: mentor.mentorDetail.profession,
      experience: mentor.mentorDetail.experience,
      languageCertificate: mentor.mentorDetail.languageCertificate,
      degreeLevel: mentor.mentorDetail.degreeLevel,
    });
    setIsModalVisible(true);
  };

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();

      formData.append('mentorId', user.id);
      formData.append('age', values.age);
      formData.append('experience', values.experience);
      formData.append('highestQualification', values.highestQualification);
      formData.append('languageCertificate', values.languageCertificate);
      formData.append('degreeLevel', values.degreeLevel);
      formData.append('bio', values.bio);
      formData.append('profession', values.profession);

      if (selectedProfile) {
        formData.append('profilePic', selectedProfile);
      }

      if (selectedCertificate) {
        formData.append('selectedCertificate', selectedCertificate);
      }

      const response = await userApi.updateMentor(user.id, formData);
      console.log(response);
      if (response.success) {
        toast.success('Cập nhật thành công!');
        setIsModalVisible(false);
        fetchMentorDetail();
      } else {
        toast.error(response.responseMessage || 'Lỗi khi cập nhật!');
      }
    } catch (err) {
      toast.error('Vui lòng kiểm tra lại thông tin nhập vào!');
      console.error(err);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const fetchMentorDetail = async () => {
    try {
      const response = await userApi.getMentorByID(user.id);
      if (response) {
        setMentor(response);
      } else {
        toast.info('Tải thông tin Giảng viên thất bại~');
      }
    } catch (error) {
      toast.error('Đã xảy ra lỗi khi tải thông tin giảng viên!');
    }
  };

  useEffect(() => {
    fetchMentorDetail();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userFireBase?.uid) return;

      try {
        const userRef = doc(db, 'users', userFireBase.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          if (userData.selectedCertificate) {
            setCertificateUrl(userData.selectedCertificate);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userFireBase]);

  if (!mentor) return null;

  console.log(mentor);
  

  return (
    <div style={{ backgroundColor: '#f0f2f5', minHeight: '100vh', padding: '24px' }}>
      <Card
        style={{
          maxWidth: 1000,
          margin: 'auto',
          marginTop: 40,
          borderRadius: 12,
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
          backgroundColor: '#ffffff', // Giữ màu trắng trong Card để nội dung nổi bật
        }}
        bodyStyle={{ padding: 32 }}
      >
        <Row gutter={24}>
        <Col xs={24} sm={6}>
          <Avatar
            size={120}
            src={
              mentor.mentorDetail.profilePic
                ? `${URL.BASE_URL}/user/${mentor.mentorDetail.profilePic}`
                : 'https://i.pravatar.cc/300'
            }
          />
        </Col>
        <Col xs={24} sm={18}>
          <Title level={2} style={{ marginBottom: 0 }}>{mentor.lastName + " " + mentor.firstName}</Title>
          <Tag color="blue" style={{ marginTop: 8 }}>{mentor.mentorDetail.profession}</Tag>
          {user?.role === "Mentor" ? (
            <Text type="secondary" style={{ display: 'block', marginTop: 4 }}>
              Vai trò: <strong>Giảng Viên</strong>
            </Text>
          ) : (
            <Text type="secondary" style={{ display: 'block', marginTop: 4 }}>
              Vai trò: <strong>...</strong>
            </Text>
          )}
          <Paragraph type="secondary" style={{ marginTop: 16 }}>{mentor.mentorDetail.bio}</Paragraph>

          <Row gutter={16} style={{ marginTop: 16 }}>
            <Col><Text strong><BookOutlined /> {mentor.mentorDetail.quantityCourse || 0} khóa học</Text></Col>
            <Col><Text strong><TeamOutlined /> {mentor.mentorDetail.quantityStudent || 0} học viên</Text></Col>
          </Row>
        </Col>
      </Row>

      <Divider />

      <Title level={4}>Chứng chỉ đã chọn</Title>
      {mentor.mentorDetail.selectedCertificate ? (
        <Image
          src={certificateUrl}
          alt="Chứng chỉ"
          style={{ maxWidth: 300, borderRadius: 8 }}
          width="100%"
          preview={{ mask: "Nhấn để phóng to" }}
        />
      ) : (
        <Text type="secondary">Chưa cập nhật chứng chỉ</Text>
      )}

      <Divider />

      <Row gutter={24}>
        <Col span={12}><Text><strong>Tuổi:</strong> {mentor.age}</Text></Col>
        <Col span={12}><Text><strong>Kinh nghiệm:</strong> {mentor.experience} năm</Text></Col>
        <Col span={12}><Text><strong>Trình độ học vấn:</strong> {mentor.highestQualification}</Text></Col>
        <Col span={12}><Text><strong>Chứng chỉ ngoại ngữ:</strong> {mentor.languageCertificate}</Text></Col>
      </Row>

      <Divider />

      <Row justify="center">
        <Button type="primary" size="large" onClick={showUpdateModal}>Cập nhật thông tin</Button>
      </Row>

      <Modal
        title="Cập nhật thông tin giảng viên"
        visible={isModalVisible}
        onOk={handleUpdate}
        onCancel={handleCancel}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="age" label="Tuổi" rules={[{ required: true, message: 'Vui lòng nhập tuổi!' }]}>
            <InputNumber min={18} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="experience" label="Kinh nghiệm (năm)" rules={[{ required: true }]}>
            <InputNumber min={0} max={50} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="highestQualification" label="Bằng cấp cao nhất" rules={[{ required: true }]}>
            <Select placeholder="Chọn bằng cấp">
              <Option value="B Tech">B Tech</Option>
              <Option value="B Pharm">B Pharm</Option>
              <Option value="M Tech">M Tech</Option>
              <Option value="PhD">PhD</Option>
            </Select>
          </Form.Item>

          <Form.Item name="languageCertificate" label="Chứng chỉ ngoại ngữ" rules={[{ required: true }]}>
            <Select placeholder="Chọn chứng chỉ">
              <Option value="IELTS">IELTS</Option>
              <Option value="TOEFL">TOEFL</Option>
              <Option value="JLPT">JLPT</Option>
              <Option value="TOPIK">TOPIK</Option>
            </Select>
          </Form.Item>

          <Form.Item name="degreeLevel" label="Bậc cấp" rules={[{ required: true }]}>
            <Select placeholder="Chọn bậc cấp">
              <Option value="A1">A1</Option>
              <Option value="A2">A2</Option>
              <Option value="B1">B1</Option>
              <Option value="B2">B2</Option>
              <Option value="C1">C1</Option>
              <Option value="C2">C2</Option>
            </Select>
          </Form.Item>

          <Form.Item name="profession" label="Nghề nghiệp" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="bio" label="Tiểu sử" rules={[{ required: true }]}>
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item label="Ảnh đại diện mới">
            <Upload
              beforeUpload={(file) => {
                setSelectedProfile(file);
                return false;
              }}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
            </Upload>
          </Form.Item>

          <Form.Item label="Chứng chỉ mới">
            <Upload
              beforeUpload={(file) => {
                setSelectedCertificate(file);
                return false;
              }}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Tải chứng chỉ lên</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
    </div>
  );
};

export default MentorProfilePage;
