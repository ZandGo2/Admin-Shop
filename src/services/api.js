import axiosInstance from "../interceptor/Interceptor";

const signUPApi = (userData) => {
  return axiosInstance.post("/auth/register", userData);
};

export { signUPApi };
