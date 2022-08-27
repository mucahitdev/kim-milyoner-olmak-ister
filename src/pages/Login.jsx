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
    <div className="h-full flex justify-center items-center">
      <div className="bg-slate-400 w-96 h-56 rounded-2xl shadow-2xl p-3 flex flex-col justify-center items-center space-y-7">
        <p className="text-2xl font-bold">Giriş Yap</p>

        <button
          className="flex bg-lime-600 p-2 rounded-lg text-white hover:bg-lime-500"
          onClick={handleLogin}
        >
          Google ile giriş yap
        </button>
      </div>
    </div>
  );
};
