import axiosClient from "./axiosClient";

const courseApi = {
  /** 📌 Nhóm 1: Lấy dữ liệu khóa học */
  getCoursesByMentor: (mentorId, status = "Active", videoShow = "Yes") => {
    return axiosClient.get(`/course/fetch/mentor-wise`, {
      params: { mentorId, status, videoShow },
    });
  },

  getOrderHistory: (customerId) => {
    return axiosClient.get(`/booking/fetch/customer-wise`, {
      params: { customerId },
    });
  },

  sendOtpToEmail: (email) => {
    return axiosClient.get(`/booking/send-otp`, {
      params: { email }
    });
  },

  bookingCourseFree: (courseId, customerId) => {
    return axiosClient.post("/booking/add-free", { courseId, customerId });
  },

  bookingCourse: ({ nameOnCard, cardNo, cvv, expiryDate, courseIds, amount, customerId, otpConfirm }) => {
    
    return axiosClient.post("/booking/add", {
      nameOnCard,
      cardNo,
      cvv,
      expiryDate,
      courseIds,
      amount,
      customerId,
      otpConfirm,
    });
  },
  
  getCourseById: (courseId, videoShow = "Yes") => {
    return axiosClient.get(`/course/fetch/course-id?courseId=${courseId}&videoShow=${videoShow}`);
  },

  /** 📌 Nhóm 2: Thêm & Cập nhật khóa học */
  addCourse: (formData) => {
    return axiosClient.post("/course/add", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  // Lấy danh sách khóa học
  getCoursesByStatus: (status, videoShow) => {
    return axiosClient.get(`/course/fetch/status-wise`, {
      params: { status, videoShow },
    });
  },

  updateCourse: (courseId, updateData) => {
    return axiosClient.put(`/course/update/${courseId}`, updateData);
  },

  /** 📌 Nhóm 3: Quản lý chương học */
  addCourseSection: (sectionData) => {
    return axiosClient.post("/course/section/add", sectionData);
  },

  updateCourseSection: (sectionId, updateData) => {
    return axiosClient.put(`/course/section/update/${sectionId}`, updateData);
  },

  /** 📌 Nhóm 4: Quản lý chủ đề trong chương */
  addCourseSectionTopic: (formData) => {
    return axiosClient.post("/course/section/topic/add", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  updateCourseSectionTopic: (topicId, updateData) => {
    return axiosClient.put(`/course/section/topic/update/${topicId}`, updateData);
  },

  /** 📌 Nhóm 5: Xóa khóa học */
  deleteCourse: (courseId) => {
    return axiosClient.delete(`/course/delete`, { params: { courseId } });
  },

  updateVideoProgress: (userId, videoId, percentWatched) => {
    return axiosClient.post("/course/video/progress", {
      userId,
      videoId,
      percentWatched,
    });
  },
};


export default courseApi;
