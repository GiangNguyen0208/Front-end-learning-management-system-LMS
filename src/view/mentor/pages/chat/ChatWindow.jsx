import { UserAddOutlined } from '@ant-design/icons';
import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Button, Tooltip, Avatar, Form, Input, Alert, Typography } from 'antd';
import Message from './Message';
import { AppContext } from '../../../../context/AppProvider';
import useFirestore from '../../../../hooks/useFirestore';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../../../firebase/config';
import { AuthContext } from '../../../../context/AuthProvider';
import courseApi from '../../../../api/courseApi';
import { toast } from 'react-toastify';
import { URL } from '../../../../api/constant';

const WrapperStyled = styled.div`
  height: 90vh;
  display: flex;
  flex-direction: column;
  background-color: #263238; /* Sử dụng màu nền của Sidebar */
  font-family: 'Inter', -apple-system, Roboto, Helvetica, sans-serif;
  padding: 24px 16px;
`;

const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  padding: 0 24px;
  background: #37474f; /* Màu nền của Header đồng bộ với Sidebar */
  color: white;
  border-bottom: 1px solid #455a64;

  .room-info {
    display: flex;
    flex-direction: column;
    gap: 4px;

    .room-title {
      font-size: 18px;
      font-weight: 600;
    }

    .room-description {
      font-size: 13px;
      color: #b0bec5;
    }
  }
`;

const ButtonGroupStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ContentStyled = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 16px;
  overflow: hidden;
  background-color: #eceff1; /* Màu nền nhẹ cho phần nội dung */
  border-radius: 16px; /* Bo góc giống Sidebar */
`;

const MessageListStyled = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-right: 6px;
  margin-bottom: 12px;
  scroll-behavior: smooth;
  background-color: #ffffff; /* Nền tin nhắn sáng hơn */
  border-radius: 8px;
  padding: 10px;
`;

const FormStyled = styled(Form)`
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 12px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);

  .ant-form-item {
    flex: 1;
    margin-bottom: 0;
  }

  input {
    border-radius: 8px;
    padding: 10px 12px;
    background-color: #f5f5f5; /* Nền input nhẹ nhàng */
  }

  button {
    border-radius: 8px;
    background-color: #001529;
    color: #fff;
    &:hover {
      background-color: #263238;
    }
  }
`;


export default function ChatWindow() {
  const { user, userFireBase } = useContext(AuthContext);
  const { selectedRoom, setIsInviteMemberVisible, isInviteMemberVisible, selectedCourseId } = useContext(AppContext);
  const uid = userFireBase?.uid;
  const photoURL = userFireBase?.photoURL;
  const displayName = userFireBase?.displayName;
  const [inputValue, setInputValue] = useState('');
  const [form] = Form.useForm();
  const inputRef = useRef(null);
  const messageListRef = useRef(null);

  const [members, setMembers] = React.useState([]); // Thêm state members để lưu danh sách thành viên

  const fetchStudentsByCourseAndMentor = async () => {
    try {
      const response = await courseApi.getStudentsByCourseAndMentor(user.id, selectedCourseId);
      const students = response?.data || [];
      setMembers(students);
    } catch (error) {
      console.error('❌ Lỗi khi lấy danh sách sinh viên:', error);
      toast.error('Không thể lấy danh sách sinh viên.');
    }
  };

  // Kiểm tra khi nào sẽ gọi fetchStudentsByCourseAndMentor
  useEffect(() => {
    if (isInviteMemberVisible && selectedCourseId) {
      fetchStudentsByCourseAndMentor();
    }
  }, [isInviteMemberVisible, selectedCourseId, user.id]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleOnSubmit = () => {
    if (!inputValue.trim()) return;

    addDoc(collection(db, 'messages'), {
      text: inputValue.trim(),
      uid,
      roomId: selectedRoom.id || '',
      displayName: user.firstName + " " +user.lastName  || '',
      email: user.emailId || '',
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      photoURL: user.mentorDetail.profilePic || '',
      role: user.role || '',
      createdAt: new Date()
    });

    form.resetFields(['message']);
    setInputValue('');

    setTimeout(() => inputRef?.current?.focus(), 100);
  };

  const condition = React.useMemo(
    () => ({
      fieldName: 'roomId',
      operator: '==',
      compareValue: selectedRoom.id,
    }),
    [selectedRoom.id]
  );

  const messages = useFirestore('messages', condition);

  useEffect(() => {
    if (messageListRef?.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight + 50;
    }
  }, [messages]);

  return (
    <WrapperStyled>
      {selectedRoom?.id ? (
        <>
          <HeaderStyled>
            <div className="room-info">
              <span className="room-title">{selectedRoom.name}</span>
              <span className="room-description">{selectedRoom.description}</span>
            </div>
            <ButtonGroupStyled>
              <Button
                icon={<UserAddOutlined />}
                onClick={() => setIsInviteMemberVisible(true)}
              >
                Thành viên
              </Button>
              <Avatar.Group size="small" maxCount={4}>
                {members.map((member) => (
                  <Tooltip title={`${member.displayName || member.firstName || member.emailId}`} key={member.id}>
                    <Avatar src={member.photoURL}>
                      {(member.displayName || member.firstName || 'U')?.charAt(0).toUpperCase()}
                    </Avatar>
                  </Tooltip>
                ))}
              </Avatar.Group>
            </ButtonGroupStyled>
          </HeaderStyled>

          <ContentStyled>
            <MessageListStyled ref={messageListRef}>
              {messages.map((mes) => (
                <Message
                  key={mes.id}
                  role={mes.role}
                  text={mes.text}
                  photoURL={mes.photoURL}
                  displayName={mes.displayName}
                  createdAt={mes.createdAt}
                />
              ))}
            </MessageListStyled>
            <FormStyled form={form}>
              <Form.Item name='message'>
                <Input
                  ref={inputRef}
                  onChange={handleInputChange}
                  onPressEnter={handleOnSubmit}
                  placeholder='Nhập tin nhắn...'
                  autoComplete='off'
                />
              </Form.Item>
              <Button type='primary' onClick={handleOnSubmit}>
                Gửi
              </Button>
            </FormStyled>
          </ContentStyled>
        </>
      ) : (
        <Alert
          message='Hãy chọn phòng để bắt đầu trò chuyện'
          type='info'
          showIcon
          style={{ margin: 16 }}
          closable
        />
      )}
    </WrapperStyled>
  );
}
