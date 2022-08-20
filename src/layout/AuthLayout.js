import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userData } from "../redux/userSlice";


export const AuthLayout = () => {
  const user = useSelector(userData);
  if (user !== null) return <Navigate to="/" replace />;
  return <Outlet />;
};
