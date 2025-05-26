import axiosClient from "./axiosClient";

const assignmentApi = {
  // Thêm category mới
  addAssignment: (formData) => {
    return axiosClient.post("/assignment/add", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  updateAssignment: (assignmentId, formData) => {
    return axiosClient.put(`/assignment/update/${assignmentId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  
  fetchAllAssignments: (courseId) => {
    return axiosClient.get(`/assignment/fetch-all/${courseId}`);
  },

  deleteAssignment: (assignmentId) => {
    return axiosClient.delete(`/assignment/${assignmentId}`);
  },

  submitAssignment: (formData) => {
    return axiosClient.post(`/assignment-submissions/submit`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  },

  // Lấy danh sách bài tập đã nộp của học sinh dựa vào courseId
  getSubmissionsByAssignmentId: (assignmentId) => {
    return axiosClient.get(`/assignment-submissions/pending?assignmentId=${assignmentId}`);
  },

  getSubmissionsGradedByAssignmentId: (assignmentId) => {
    return axiosClient.get(`/assignment-submissions/graded/byAssignment?assignmentId=${assignmentId}`);
  },

  gradeSubmission: (submissionId, request) => {
    return axiosClient.put(`/assignment-submissions/grade/${submissionId}`, {
      score: request.score,
      feedback: request.feedback,
    })
  },

  getSubmissionsGradedByStudentID: (studentId) => {
    return axiosClient.get(`/assignment-submissions/graded/byStudent?studentId=${studentId}`)
  },

};

export default assignmentApi;
