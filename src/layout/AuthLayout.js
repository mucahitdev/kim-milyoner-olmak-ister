import { Outlet, Navigate } from "react-router-dom";
import { useIsLoggedIn } from "../config/hooks";
import ReactLoading from "react-loading";

export const AuthLayout = () => {
  const isLoggedIn = useIsLoggedIn();

  if (isLoggedIn === null)
    return (
      <div className="h-full flex justify-center items-center">
        <ReactLoading type="bars" height={"20%"} width={"20%"} />
      </div>
    );
  else if (isLoggedIn === true) return <Navigate replace to="/" />;
  return <Outlet />;
};
