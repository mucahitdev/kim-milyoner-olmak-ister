import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userData } from "../redux/userSlice";

export const Layout = () => {
  const user = useSelector(userData);
  if (user === null) return <Navigate to="/login" replace />;
  return <Outlet />;
};
