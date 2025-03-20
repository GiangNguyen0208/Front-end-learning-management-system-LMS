import axiosClient from "./axiosClient";

const categoryApi = {
  // Thêm category mới
  addCategory: (categoryData) => {
    return axiosClient.post("/course/category/add", categoryData);
  },

  // Cập nhật category
  updateCategory: (categoryData) => {
    return axiosClient.put("/course/category/update", categoryData);
  },

  // Lấy tất cả category
  fetchAllCategories: () => {
    return axiosClient.get("/course/category/fetch/all");
  },

  // Xóa category theo ID
  deleteCategory: (categoryId) => {
    return axiosClient.delete(`/course/category/delete?categoryId=${categoryId}`);
  }
};

export default categoryApi;
