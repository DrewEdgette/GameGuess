import React from "react";
import { useState, useEffect } from "react";
import { LoginContext } from "../contexts/LoginContext";

function LoginProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const [loginName, setLoginName] = useState(
    localStorage.getItem("loginName")
  );

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
    localStorage.setItem('loginName', loginName);
  }, [isLoggedIn, loginName]);

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);


  return (
    <LoginContext.Provider
      value={{ isLoggedIn, login, logout, loginName, setLoginName }}
    >
      {props.children}
    </LoginContext.Provider>
  );
}

export default LoginProvider;
