import axiosInstance from "../interceptor/Interceptor";

const signUPApi = (userData) => {
  return axiosInstance.post("/auth/register", userData);
};

const loginApi = (userData) => {
  return axiosInstance.post("/auth/login",userData)
}

export { signUPApi,loginApi };
