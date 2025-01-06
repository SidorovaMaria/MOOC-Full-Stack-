import React from "react";
import PropTypes from "prop-types";
const LoginForm = ({
  handleSubmit,
  message,
  username,
  password,
  setUsername,
  setPassword,
}) => {
  LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired,
    setUsername: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  };
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
