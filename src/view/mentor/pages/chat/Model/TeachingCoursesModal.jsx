import React, { useState, useEffect, useContext } from 'react';
import { Modal, Typography, Spin, List, Empty, Button } from 'antd';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import courseApi from '../../../../../api/courseApi';
import { AuthContext } from '../../../../../context/AuthProvider';
import { AppContext } from '../../../../../context/AppProvider';

const CourseItem = styled(List.Item)`
  padding: 12px 16px;
  background: #f1f5f9;
  border-radius: 8px;
  margin-bottom: 12px;

  h4 {
    margin: 0;
    color: #0f172a;
    font-weight: 600;
    font-size: 15px;
  }

  p {
    margin: 4px 0 0;
    color: #334155;
    font-size: 13px;
  }
`;

export default function TeachingCoursesModal({ visible, onClose }) {
  const mentor = useContext(AuthContext) || {};
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const { setIsAddRoomVisible, setSelectedCourseId } = useContext(AppContext);

  const handleAddRoom = (courseId) => {
    setSelectedCourseId(courseId);
    setIsAddRoomVisible(true); 
  };

  // Chỉ fetch khi modal mở
  useEffect(() => {
    if (visible && mentor?.user.id) {
      fetchCourses();
    }
  }, [visible]);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await courseApi.getCoursesByMentor(mentor.user.id);
      setCourses(response.data?.courses || []);
    } catch (error) {
      toast.error("❌ Không thể tải danh sách khóa học.");
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <Modal
      open={visible}
      onCancel={onClose}
      onOk={onClose}
      title="📚 Khóa học đang giảng dạy"
      okText="Đóng"
      width={600}
    >
      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <Spin size="large" />
        </div>
      ) : courses.length > 0 ? (
        <List
          dataSource={courses}
          renderItem={(course) => (
            <CourseItem key={course.id}>
              <List.Item.Meta
                title={<h4>{course.name}</h4>}
                description={<p>{course.description || 'Không có mô tả'}</p>}
              />
              <Button
                type="primary" 
                className="chat-button"
                onClick={() => handleAddRoom(course.id)}
              >
                Tạo phòng chat
              </Button>
            </CourseItem>
          )}
        />
      ) : (
        <Empty description="Không có khóa học nào đang giảng dạy." />
      )}
    </Modal>
  );
}
