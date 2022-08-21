import React from "react";
import { useDispatch } from "react-redux";
import { signOut } from "../redux/userSlice";
import { NavLink } from "react-router-dom";
import { useDocumentTitle } from "../config/hooks";

export const Home = () => {
  const dispatch = useDispatch();
  useDocumentTitle("Home");

  const handleSignOut = () => {
    dispatch(signOut());
  };

  return (
    <div>
      <h1>Home</h1>
      <button onClick={handleSignOut}>Çıkış yap</button>
      <NavLink to="/profile">Profile</NavLink>
    </div>
  );
};
