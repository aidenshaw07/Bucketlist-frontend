import React from "react";
import LoggedInPage from "./LoggedInPage";
import LoginPage from "./LoginPage";
import Spinner from "./Spinner";
import { useAuth } from "../hooks/useAuth";

const LandingPage = () => {
  const { loading, loggedIn, handleLogin, handleLogout } = useAuth();

  if (loading) {
    return <Spinner />;
  }

  return loggedIn ? (
    <LoggedInPage onLogout={handleLogout} />
  ) : (
    <LoginPage onLogin={handleLogin} />
  );
};

export default LandingPage;
