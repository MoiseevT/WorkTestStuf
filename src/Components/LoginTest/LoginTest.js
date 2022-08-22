import React, { useState } from "react";
import styled from "styled-components";
import {
  browserName,
  browserVersion,
  deviceType,
  isDesktop,
  isMobile,
  osName,
  osVersion,
} from "react-device-detect";
import { guid, Users } from "./Data";

const LoginTest = () => {
  const [error, setError] = useState(null);
  const [providedUserData, setProvidedUserData] = useState({
    login: "",
    password: "",
  });
  const [verifiedClientUserData, setVerifiedClientUserData] = useState({
    login: null,
    password: null,
    accessToken: null,
    refreshToken: null,
    userDevice: null,
    name: null
  });
  console.log(localStorage)

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onSettingLogin = (e) => {
    let newProvidedData = {
      login: e.target.value,
      password: providedUserData.password,
    };
    setProvidedUserData({ ...newProvidedData });
  };

  const onSettingPassword = (e) => {
    let newProvidedData = {
      login: providedUserData.login,
      password: e.target.value,
    };
    setProvidedUserData({ ...newProvidedData });
  };

  const onSentUserData = () => {
    let deviceInfo = {
      isDesktop,
      isMobile,
      deviceType,
      browserName,
      browserVersion,
      osName,
      osVersion,
    };
    if (
      providedUserData.login.length === 0 &&
      providedUserData.password.length === 0
    )
      setError("No Data");
    else if (providedUserData.login.length === 0) setError("No Login");
    else if (providedUserData.password.length === 0) setError("No Password");
    else {
      let newSentData = Object.assign(providedUserData, {
        userDevice: deviceInfo,
      });
      let userLoginAttempt = {
        login: Users.find((user) => user.login === newSentData.login)?.login,
        password: Users.find((user) => user.password === newSentData.password)
          ?.password,
        userDevice: newSentData.userDevice,
        name: Users.find((user) => user.login === newSentData.login)?.name
      };
      if (
        userLoginAttempt.login !== newSentData.login &&
        userLoginAttempt.password !== newSentData.password
      ) {
        setError("WrongData");
      } else if (
        userLoginAttempt.login === newSentData.login &&
        userLoginAttempt.password === newSentData.password
      ) {
        let response = {
          login: userLoginAttempt.login,
          password: userLoginAttempt.password,
          userDevice: userLoginAttempt.userDevice,
          name: userLoginAttempt.name,
          accessToken: guid(),
          refreshToken: guid(),
        };
        setVerifiedClientUserData(response);
        let userData = {
          "token": `${response.accessToken}`,
          "name": `${response.name}`
        }
        localStorage.setItem("UserData", JSON.stringify(userData));
        setError(null);
        setIsLoggedIn(true);
      }
    }
  };

  const onLogout = () => {
    setIsLoggedIn(false);
    let defaultProvidedData = {
      login: "",
      password: "",
    };
    let defaultVerifiedClientUserData = {
      login: null,
      password: null,
      accessToken: null,
      refreshToken: null,
      userDevice: null,
    };
    setVerifiedClientUserData(defaultVerifiedClientUserData);
    setProvidedUserData(defaultProvidedData);
  };

  return (
    <LoginTestStyled>
      <AuthorizationBlockStyled>
        <AuthorizationInputStyled
          placeholder="Login"
          value={providedUserData.login}
          onChange={(e) => onSettingLogin(e)}
        />
        <AuthorizationInputStyled
          placeholder="Password"
          value={providedUserData.password}
          onChange={(e) => onSettingPassword(e)}
        />
        <ConditionSpanStyled>
          {!isLoggedIn && error === null
            ? "ЧЕЛ ТЫ НЕ ЗАЛОГИНЕН"
            : error === "No Data"
            ? "ЧЕЛ ВВЕДИ ДАННЫЕ"
            : error === "No Login"
            ? "ЧЕЛ ВВЕДИ ЛОГИН"
            : error === "No Password"
            ? "ЧЕЛ ВВЕДИ ПАРОЛЬ"
            : error === "WrongData"
            ? "Все херня, переделывай"
            : null}
        </ConditionSpanStyled>
        <AuthorizationButtonStyled onClick={isLoggedIn ? null : onSentUserData}>
          Логин
        </AuthorizationButtonStyled>
        {/*<AuthorizationButtonStyled onClick={isLoggedIn ? onLogout : null}>Логаут</AuthorizationButtonStyled>*/}
      </AuthorizationBlockStyled>
    </LoginTestStyled>
  );
};

const LoginTestStyled = styled.div`
  width: 1500px;
  height: 800px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
`;

const AuthorizationBlockStyled = styled.div`
  width: 400px;
  height: 500px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const AuthorizationInputStyled = styled.input`
  width: 300px;
  height: 30px;
  margin-top: 20px;
`;
const AuthorizationButtonStyled = styled.button`
  width: 200px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
`;
const ConditionSpanStyled = styled.span`
  margin-top: 10px;
  margin-bottom: 10px;
  color: red;
`;
export default LoginTest;
