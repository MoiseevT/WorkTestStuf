import React from "react";
import { Navigate, Routes, Route, BrowserRouter } from "react-router-dom";
import { history } from "./history";
import HomePage from "./HomePage";
import LoginTest from "./LoginTest";
import RouteGuard from "./RouteGuard";

const Routess = () => {
  return (
    <BrowserRouter history={history}>
      <Routes>
        <Route
          element={<RouteGuard token="token" routeRedirect={"/login"} />}
        />
        <Route path="/login" element={<LoginTest />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routess;
