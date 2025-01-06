import React from "react";

const LoginForm = ({
  handleSubmit,
  message,
  username,
  password,
  setUsername,
  setPassword,
}) => {
  return (
    <form className="loginForm" onSubmit={handleSubmit}>
      <p style={{ padding: 0, margin: 0 }}>{message}</p>

      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          value={username}
          name="username"
          onChange={({ target }) => setUsername(target.value)}
          type="text"
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          value={password}
          name="password"
          onChange={({ target }) => setPassword(target.value)}
          type="password"
        />
      </div>
      <button className="login-btn" type="submit">
        log In
      </button>
    </form>
  );
};

export default LoginForm;
