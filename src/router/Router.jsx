import { Route, Routes } from "react-router";
import Dashbord from "../pages/Dashbord";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import PageNotFound from "../pages/PageNotFound";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashbord />} />
      <Route path="login" element={<Login />} />
      <Route path="sign-up" element={<SignUp />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Router;
