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
  }

};

export default assignmentApi;
