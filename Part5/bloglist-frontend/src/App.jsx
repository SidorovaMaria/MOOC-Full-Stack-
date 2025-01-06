import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import "./index.css";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      setUser(user);
      setUsername("");
      setPassword("");
    } catch {
      console.log(exception);
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
  const loginForm = () => (
    <form className="loginForm" onSubmit={handleLogin}>
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
  const UserLoggedIn = () =>
    blogs.map((blog) => <Blog key={blog.id} blog={blog} />);
  return (
    <div>
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p className="user-logged">{user.name} logged-in</p>
          {UserLoggedIn()}
        </div>
      )}
    </div>
  );
};

export default App;
