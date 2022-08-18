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
  const [sentUserData, setSentUserData] = useState({
    login: null,
    password: null,
    userDevice: null,
  });
  const [providedUserData, setProvidedUserData] = useState({
    login: "",
    password: "",
  });
  const [verifiedBackendUserData, setVerifiedBackendUserData] = useState({
    login: null,
    password: null,
    accessToken: null,
    refreshToken: null,
    userDevice: null,
  });
  const [verifiedClientUserData, setVerifiedClientUserData] = useState({
    login: null,
    password: null,
    accessToken: null,
    refreshToken: null,
    userDevice: null,
  });
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
      setError("Waiting4Response");
      let newSentData = Object.assign(providedUserData, {
        userDevice: deviceInfo,
      });
      setSentUserData(newSentData);
    }
  };

  const onAuthorizationCheck = () => {
    let userLoginAttempt = {
      login: Users.find((user) => user?.login === sentUserData?.login)?.login,
      password: Users.find((user) => user?.password === sentUserData?.password)
        ?.password,
      userDevice: sentUserData.userDevice,
    };
    if (userLoginAttempt.login === undefined) setError("LoginUndefined");
    else if (userLoginAttempt.password === undefined)
      setError("PasswordUndefined");
    else if (
      userLoginAttempt.login === sentUserData.login &&
      userLoginAttempt.password === sentUserData.password
    ) {
      setError("Waiting4Send");
      let response = {
        login: userLoginAttempt.login,
        password: userLoginAttempt.password,
        userDevice: userLoginAttempt.userDevice,
        accessToken: guid(),
        refreshToken: guid(),
      };
      setVerifiedBackendUserData(response);
    }
  };
  const onGetResponse = () => {
    if (verifiedBackendUserData.password?.length > 0) {
      setError(null);
      setVerifiedClientUserData(verifiedBackendUserData);
      setIsLoggedIn(true);
    } else setError("TooEarly");
  };
  const onLogout = () => {
    setIsLoggedIn(false)
    let defaultProvidedData = {
      login: "",
      password: "",
    }
    let defaultVerifiedClientUserData = {
      login: null,
      password: null,
      accessToken: null,
      refreshToken: null,
      userDevice: null,
    }
    let defaultSentUserData = {
      login: null,
      password: null,
      userDevice: null,
    }
    setVerifiedClientUserData(defaultVerifiedClientUserData)
    setProvidedUserData(defaultProvidedData)
    setSentUserData(defaultSentUserData)
  }
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
          {isLoggedIn && error === null ? (
            <p style={{ color: "green" }}>ЧЕЛ ТЫ ЗАЛОГИНЕН</p>
          ) : !isLoggedIn && error === null ? (
            "ЧЕЛ ТЫ НЕ ЗАЛОГИНЕН"
          ) : error === "No Data" ? (
            "ЧЕЛ ВВЕДИ ДАННЫЕ"
          ) : error === "No Login" ? (
            "ЧЕЛ ВВЕДИ ЛОГИН"
          ) : error === "No Password" ? (
            "ЧЕЛ ВВЕДИ ПАРОЛЬ"
          ) : error === "Waiting4Response" ? (
            "ЧЕЛ НАЖМИ ПРОВЕРИТЬ"
          ) : error === "LoginUndefined" ? (
            "ЧЕЛ ЛОГИН НЕ ВЕРНЫЙ"
          ) : error === "PasswordUndefined" ? (
            "ЧЕЛ ПАРОЛЬ НЕ ВЕРНЫЙ"
          ) : error === "Waiting4Send" ? (
            "ЧЕЛ НАЖМИ ОТПРАВИТЬ"
          ) : error === "TooEarly" ? (
            "Эй дружок-пирожок, тобою выбрана неправильная дверь, клуб кожевенного мастерства двумя этажами выше"
          ) : null}
        </ConditionSpanStyled>
        <AuthorizationButtonStyled onClick={isLoggedIn ? null : onSentUserData}>
          Логин
        </AuthorizationButtonStyled>
        <AuthorizationButtonStyled onClick={isLoggedIn ? onLogout : null}>Логаут</AuthorizationButtonStyled>
        <AuthorizationButtonStyled
          onClick={isLoggedIn ? null : onAuthorizationCheck}
        >
          Проверить данные
        </AuthorizationButtonStyled>
        <AuthorizationButtonStyled onClick={isLoggedIn ? null : onGetResponse}>
          Отправить ответ
        </AuthorizationButtonStyled>
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
