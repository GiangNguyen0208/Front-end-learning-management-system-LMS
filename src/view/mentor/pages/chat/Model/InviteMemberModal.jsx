import React, { useContext, useEffect, useMemo, useState } from "react";
import { Form, Modal, Select, Spin, Avatar, List, Button } from "antd";
import { AppContext } from "../../../../../context/AppProvider";
import courseApi from "../../../../../api/courseApi";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../../../firebase/config";

// Modal mời thành viên vào nhóm chat
export default function InviteMemberModal() {
  const { isInviteMemberVisible, setIsInviteMemberVisible, selectedRoomId, selectedRoom } = useContext(AppContext);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    if (!isInviteMemberVisible || !selectedRoomId) return;

    const fetchMembers = async () => {
      setLoading(true);

      try {
        // Lấy room document từ Firestore
        const roomDoc = await getDoc(doc(db, "rooms", selectedRoomId));
        if (!roomDoc.exists()) throw new Error("Room không tồn tại!");
        const response = await courseApi.getStudentsByCourseAndMentor(roomDoc.data().mentorId, roomDoc.data().courseId);
        setMembers(response.data || []);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách thành viên:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [isInviteMemberVisible, selectedRoomId]);

  const handleInviteMember = async (memberId) => {
    if (!selectedRoomId || !selectedRoom) {
      console.error("Lỗi: selectedRoomId hoặc selectedRoom không tồn tại!");
      return;
    }
  
    try {
      const roomRef = doc(db, "rooms", selectedRoomId);
  
      // Cập nhật danh sách thành viên
      await updateDoc(roomRef, {
        members: arrayUnion(memberId),
      });
  
      console.log(`✅ Mời thành công thành viên ${memberId} vào nhóm chat`);
    } catch (error) {
      console.error("❌ Lỗi khi cập nhật danh sách thành viên:", error);
    }
  };
  
  
  return (
    <Modal
      title="Danh sách thành viên"
      open={isInviteMemberVisible}
      onCancel={() => setIsInviteMemberVisible(false)}
      footer={null}
      destroyOnClose
    >
      {loading ? (
        <Spin />
      ) : (
        <List
          dataSource={members}
          itemLayout="horizontal"
          renderItem={(member) => {
            const isInvited = selectedRoom?.members?.includes(member.id);

            return (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar src={member.photoURL}>
                      {!member.photoURL && member.firstName?.[0]}
                    </Avatar>
                  }
                  title={`${member.firstName} ${member.lastName}`}
                  description={member.emailId}
                />
                <Button
                  type="primary"
                  disabled={isInvited}
                  style={{ opacity: isInvited ? 0.5 : 1 }}
                  onClick={() => handleInviteMember(member.id)}
                >
                  {isInvited ? "Đã mời" : "Mời vào nhóm chat"}
                </Button>
              </List.Item>
            );
          }}
        />
      )}
    </Modal>
  );
}
