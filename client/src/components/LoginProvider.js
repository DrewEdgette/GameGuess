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

  const [loginID, setLoginID] = useState(
    localStorage.getItem("loginID")
  );

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
    localStorage.setItem('loginName', loginName);
    localStorage.setItem("loginID", loginID);

  }, [isLoggedIn, loginName, loginID]);

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);


  return (
    <LoginContext.Provider
      value={{ isLoggedIn, login, logout, loginName, setLoginName, loginID, setLoginID }}
    >
      {props.children}
    </LoginContext.Provider>
  );
}

export default LoginProvider;
