import axiosClient from "./axiosClient";

const ratingApi = {
  addRating: (commentData) => {
    return axiosClient.post("/rating/add", commentData);
  },
  getRatingsByCourse: (courseId) => {
    return axiosClient.get(`/rating/rating-course/${courseId}`);
  },
  getRatingsByUser: (userId) => {
    return axiosClient.get(`/rating/rating-user/${userId}`);
  }
};

export default ratingApi;