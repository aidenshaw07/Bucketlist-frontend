"use client";

import { useAuth } from "../hooks/useAuth";
import { LoggedInPage } from "../pages/LoggedInPage";
import { useStoreForSignUpPage } from "../../store/useStore";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const { loggedIn, handleCreateUser } = useAuth();
  const router = useRouter();

  const {
    email,
    password,
    passwordCheck,
    username,
    setEmail,
    setPassword,
    setPasswordCheck,
    setUsername,
  } = useStoreForSignUpPage();

  const handleChange = (setState) => (e) => {
    setState(e.target.value);
  };

  const handleSignUp = (e: any) => {
    e.preventDefault();
    handleCreateUser(email, password, username, passwordCheck);
  };

  const handleClick = () => {
    const emailRegex = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$");
    if (
      username !== "" &&
      email !== "" &&
      emailRegex.test(email) &&
      password === passwordCheck
    ) {
      return router.push("/");
    }
  };

  if (loggedIn) {
    return <LoggedInPage />;
  }

  return (
    <div>
      <h1>Sign Up Page</h1>
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="Create a username"
          value={username}
          onChange={handleChange(setUsername)}
        />
        <input
          type="email"
          placeholder="Your email address"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          value={email}
          onChange={handleChange(setEmail)}
        />
        <input
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={handleChange(setPassword)}
        />
        <input
          type="password"
          placeholder="Type your password again"
          value={passwordCheck}
          onChange={handleChange(setPasswordCheck)}
        />
        <button onClick={handleClick}>Create a User!</button>
      </form>
    </div>
  );
}
