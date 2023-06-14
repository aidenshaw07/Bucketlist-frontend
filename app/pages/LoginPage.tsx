import React, { useState } from "react";

const LoginPage = ({ onLogin }: any) => {
  const [email, setEmail] = useState("aidenshaw.leo@gmail.com");
  const [password, setPassword] = useState("Hoppaa");

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default LoginPage;
