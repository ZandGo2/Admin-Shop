import axiosInstance from "../interceptor/Interceptor";

const signUPApi = (userData) => {
  return axiosInstance.post("/auth/register", userData);
};

const loginApi = (userData) => {
  return axiosInstance.post("/auth/login", userData);
};

const GetProductsApi = (page, name) => {
  return axiosInstance.get(`/products?page=${page}&limit=8&name=${name}`);
};

const DeleteProductApi = (id) => {
  return axiosInstance.delete(`/products/${id}`);
};

const CreatedProductApi = (productData) => {
  return axiosInstance.post("/products", productData);
};

const UpdateProductApi = (productData, id) => {
  return axiosInstance.put(`/products/${id}`, productData);
};

export {
  signUPApi,
  loginApi,
  GetProductsApi,
  DeleteProductApi,
  CreatedProductApi,
  UpdateProductApi,
};
