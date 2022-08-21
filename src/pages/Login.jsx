import React from "react";
import { useDispatch } from "react-redux";
import { loginAsync } from "../redux/userSlice";
import { useDocumentTitle } from "../config/hooks";

export const Login = () => {
  const dispatch = useDispatch();
  useDocumentTitle("Giriş Yap");

  const handleLogin = () => {
    dispatch(loginAsync());
  };

  return (
    <div>
      <h1>Login</h1>

      <button onClick={handleLogin}>Login</button>
    </div>
  );
};
