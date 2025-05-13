import { Route, Routes } from "react-router";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import PageNotFound from "../pages/PageNotFound";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="login" element={<Login />} />
      <Route path="sign-up" element={<SignUp />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Router;
