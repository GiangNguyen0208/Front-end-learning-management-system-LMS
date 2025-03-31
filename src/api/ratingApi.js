import axiosClient from "./axiosClient";

const ratingApi = {
  getRatingsByCourse: (courseId) => {
    return axiosClient.get(`/rating/course/${courseId}`);
  },
  addRating: (commentData) => {
    console.log("Data Rating: ", commentData);
    
    return axiosClient.post("/rating/course/add", commentData);
  },
};

export default ratingApi;