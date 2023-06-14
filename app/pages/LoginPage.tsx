import React, { useState } from "react";

export const LoginPage = ({
  onLogin,
}: {
  onLogin: (email: string, password: string) => void;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onLogin(email, password);
  };

  const handleChange = (setState: any) => (e: any) => {
    setState(e.target.value);
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={handleChange(setEmail)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={handleChange(setPassword)}
        />
        <button type="submit">Log In</button>
      </form>
      <h3>
        You don't have an account? <a href="sign-up">Sign Up here!</a>
      </h3>
    </div>
  );
};
