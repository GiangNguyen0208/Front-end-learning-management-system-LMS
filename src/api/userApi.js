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
};

export default userApi;