import React, { useState, useContext, useMemo, useEffect } from "react";
import { AuthContext } from "./AuthProvider";
import useFirestore from "../hooks/useFirestore";

export const AppContext = React.createContext();

export default function AppProvider({ children }) {
  const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
  const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const { user } = useContext(AuthContext);

  // Kiểm tra nếu có user, sau đó lấy phòng chứa user
  const roomsCondition = useMemo(() => {
    return user?.uid ? {
      fieldName: "members",
      operator: "array-contains",
      compareValue: user.uid,
    } : {};
  }, [user?.uid]);

  const rooms = useFirestore("rooms", roomsCondition);
  
  // Tìm phòng đã chọn từ danh sách phòng
  const selectedRoom = useMemo(
    () => rooms.find((room) => room.id === selectedRoomId) || {},
    [rooms, selectedRoomId]
  );
  
  // Kiểm tra điều kiện lấy thành viên trong phòng
  const usersCondition = useMemo(() => {
    return selectedRoom.members && selectedRoom.members.length > 0 ? {
      fieldName: "uid",
      operator: "in",
      compareValue: selectedRoom.members,
    } : {};
  }, [selectedRoom.members]);

  const members = useFirestore("users", usersCondition);

  // Cập nhật selectedCourseId khi selectedRoom thay đổi
  useEffect(() => {
    if (selectedRoom?.courseId) {
      setSelectedCourseId(selectedRoom.courseId);
    } else {
      setSelectedCourseId(null);
    }
  }, [selectedRoom]);

  // Hàm clearState đã bị comment, có thể giữ lại hoặc xóa nếu không cần thiết
  // const clearState = () => {
  //   setSelectedRoomId("");
  //   setIsAddRoomVisible(false);
  //   setIsInviteMemberVisible(false);
  // };

  return (
    <AppContext.Provider
      value={{
        rooms,
        members,
        selectedRoom,
        isAddRoomVisible,
        setIsAddRoomVisible,
        selectedRoomId,
        setSelectedRoomId,
        isInviteMemberVisible,
        setIsInviteMemberVisible,
        selectedCourseId,
        setSelectedCourseId,
        // clearState, // nếu không cần có thể xóa
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
