import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export const useIsLoggedIn = () => {
  const [isLogin, setIsLogin] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsLogin(!!user);
    })();
  }, []);

  return isLogin;
};
