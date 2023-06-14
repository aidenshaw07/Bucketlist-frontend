import React from "react";
import { LoggedInPage } from "./LoggedInPage";
import { LoginPage } from "./LoginPage";
import { Loading } from "./Loading";
import { useAuth } from "../hooks/useAuth";

export const LandingPage = () => {
  const { loading, loggedIn, handleLogin, handleLogout } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return loggedIn ? (
    <LoggedInPage onLogout={handleLogout} />
  ) : (
    <LoginPage onLogin={handleLogin} />
  );
};
