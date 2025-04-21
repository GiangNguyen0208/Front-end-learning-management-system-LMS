import axiosClient from "./axiosClient";
import { URL } from "./constant";

const userApi = {
  uploadAvatar: async (userId, formData) => {
    try {
      const response = await axiosClient.post(
        `${URL.BASE_URL}/user/${userId}/upload-avatar`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data; // { success: true, avatar: "filename.jpg" }
    } catch (error) {
      console.error("Upload avatar error:", error);
      throw new Error("Upload avatar thất bại.");
    }
  },

  getAllMentors: async () => {
    try {
      const response = await axiosClient.get(`${URL.BASE_URL}/user/mentor/mentors`);
      return response.data; // { success: true, mentors: [...] }
    } catch (error) {
      console.error("Get all mentors error:", error);
      throw new Error("Lấy danh sách giảng viên thất bại.");
    }
  },
  getAll: async () => {
    try {
      const response = await axiosClient.get(`${URL.BASE_URL}/user/users`);
      return response.data; // { success: true, users: [...] }
    } catch (error) {
      console.error("Get all users error:", error);
      throw new Error("Lấy danh sách người dùng thất bại.");
    }
  },
};

export default userApi;