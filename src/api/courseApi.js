import axiosClient from "./axiosClient";

const courseApi = {
  /** 📌 Nhóm 1: Lấy dữ liệu khóa học */
  // Lấy tất cả khóa học của mentor theo trạng thái
  getCoursesByMentor: (mentorId, status = "Active", videoShow = "Yes") => {
    return axiosClient.get(`/course/fetch/mentor-wise`, {
      params: { mentorId, status, videoShow },
    });
  },

  // Lấy thông tin chi tiết của một khóa học theo ID
  getCourseById: (courseId) => {
    return axiosClient.get(`/course/${courseId}`);
  },

  /** 📌 Nhóm 2: Thêm & Cập nhật khóa học */
  // Thêm khóa học mới
  addCourse: (formData) => {
    return axiosClient.post("/course/add", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  // Cập nhật thông tin khóa học
  updateCourse: (courseId, updateData) => {
    return axiosClient.put(`/course/update/${courseId}`, updateData);
  },

  /** 📌 Nhóm 3: Quản lý chương học */
  // Thêm một chương mới vào khóa học
  addCourseSection: (sectionData) => {
    return axiosClient.post("/course/section/add", sectionData);
  },

  // Cập nhật chương học
  updateCourseSection: (sectionId, updateData) => {
    return axiosClient.put(`/course/section/update/${sectionId}`, updateData);
  },

  /** 📌 Nhóm 4: Quản lý chủ đề trong chương */
  // Thêm một chủ đề mới vào chương
  addCourseSectionTopic: (formData) => {
    return axiosClient.post("/course/section/topic/add", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  // Cập nhật chủ đề trong chương
  updateCourseSectionTopic: (topicId, updateData) => {
    return axiosClient.put(`/course/section/topic/update/${topicId}`, updateData);
  },

  /** 📌 Nhóm 5: Xóa khóa học */
  // Xóa khóa học theo ID
  deleteCourse: (courseId) => {
    return axiosClient.delete(`/course/delete`, { params: { courseId } });
  },
};

export default courseApi;
