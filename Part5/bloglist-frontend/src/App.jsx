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
  const [message, setMessage] = useState(null);

  const [blog, setBlog] = useState({
    author: "",
    title: "",
    url: "",
  });

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      setUser(user);
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log(exception);
      setMessage("Wrong username or password");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };
  const handleLogOut = (e) => {
    e.preventDefault();
    window.localStorage.clear();
    setUser(null);
  };
  const addBlog = (e) => {
    e.preventDefault();
    const blogObject = {
      author: blog.author,
      title: blog.title,
      url: blog.url,
    };
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      setBlog({
        author: "",
        title: "",
        url: "",
      });
    });
    setMessage(`Blog "${blog.title}" by ${blog.author} is succesfully added`);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };
  const loginForm = () => (
    <form className="loginForm" onSubmit={handleLogin}>
      <p className="">{message}</p>
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

  const blogForm = () => (
    <form className="blogForm" onSubmit={addBlog}>
      <p>{message}</p>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          name="title"
          value={blog.title}
          onChange={(e) =>
            setBlog((prevBlog) => ({
              ...prevBlog,
              title: e.target.value,
            }))
          }
        />
      </div>
      <div>
        <label htmlFor="author">Author:</label>
        <input
          id="author"
          type="text"
          name="author"
          value={blog.author}
          onChange={(e) =>
            setBlog((prevBlog) => ({
              ...prevBlog,
              author: e.target.value,
            }))
          }
        />
      </div>
      <div>
        <label htmlFor="url">Url:</label>
        <input
          id="url"
          type="text"
          name="url"
          value={blog.url}
          onChange={(e) =>
            setBlog((prevBlog) => ({
              ...prevBlog,
              url: e.target.value,
            }))
          }
        />
      </div>
      <button type="submit" className="login-btn">
        save Blog
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
        <div className="loggedIn">
          <p className="user-logged">{user.name} logged-in</p>
          <button className="logout-btn" onClick={handleLogOut}>
            Log Out{" "}
          </button>
          {blogForm()}
          {UserLoggedIn()}
        </div>
      )}
    </div>
  );
};

export default App;
