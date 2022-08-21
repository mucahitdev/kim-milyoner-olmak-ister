import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

// Auth hook

export const useIsLoggedIn = () => {
  const [isLogin, setIsLogin] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsLogin(!!user);
    })();
  }, []);

  return isLogin;
};

// Title hook

export const useDocumentTitle = (title) => {

  useEffect(() => {
      document.title = `${title} - Milyoner`;
  }, [title]);

  return null;
}
