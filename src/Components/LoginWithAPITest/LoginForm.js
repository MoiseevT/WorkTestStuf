import React, { useState } from "react";
import { AuthService } from "./AuthService";
import { useDispatch } from "react-redux";
import { setAuth, setUser } from "./LoginSlice";

const LoginForm = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const onLogin = async (login, password) => {
    try {
      const response = await AuthService.login(login, password);
      localStorage.setItem("token", response.data.accessToken);
      dispatch(setAuth(true));
      dispatch(setUser(response.data.user));
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  };
  const onLogout = async () => {
    try {
      const response = await AuthService.logout();
      localStorage.removeItem("token");
      dispatch(setAuth(false));
      dispatch(setUser({}));
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  };

  return (
    <div>
      <input
        onChange={(e) => setLogin(e.target.value)}
        value={login}
        type="text"
        placeholder="login"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        placeholder="password"
      />
      <button onClick={() => onLogin}>Логин</button>
      <button onClick={() => onLogout}>Логин назад</button>
    </div>
  );
};

export default LoginForm;
