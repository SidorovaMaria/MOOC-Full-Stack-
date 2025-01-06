import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import "./index.css";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
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

  // const blogForm = () => (
  //   <form className="blogForm" onSubmit={addBlog}>
  //     <p style={{ display: message === "" ? "none" : "block" }}>{message}</p>
  //     <div>
  //       <label htmlFor="title">Title:</label>
  //       <input
  //         id="title"
  //         type="text"
  //         name="title"
  //         value={blog.title}
  //         onChange={(e) =>
  //           setBlog((prevBlog) => ({
  //             ...prevBlog,
  //             title: e.target.value,
  //           }))
  //         }
  //       />
  //     </div>
  //     <div>
  //       <label htmlFor="author">Author:</label>
  //       <input
  //         id="author"
  //         type="text"
  //         name="author"
  //         value={blog.author}
  //         onChange={(e) =>
  //           setBlog((prevBlog) => ({
  //             ...prevBlog,
  //             author: e.target.value,
  //           }))
  //         }
  //       />
  //     </div>
  //     <div>
  //       <label htmlFor="url">Url:</label>
  //       <input
  //         id="url"
  //         type="text"
  //         name="url"
  //         value={blog.url}
  //         onChange={(e) =>
  //           setBlog((prevBlog) => ({
  //             ...prevBlog,
  //             url: e.target.value,
  //           }))
  //         }
  //       />
  //     </div>
  //     <button type="submit" className="login-btn">
  //       save Blog
  //     </button>
  //   </form>
  // );

  const blogFormRef = useRef();
  const toggleVisibility = () => {
    blogFormRef.current.toggleVisibility();
  };
  return (
    <div>
      {!user && (
        <LoginForm
          handleSubmit={handleLogin}
          message={message}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      )}
      {user && (
        <div className="loggedIn">
          <p className="user-logged">{user.name} logged-in</p>
          <button className="logout-btn" onClick={handleLogOut}>
            Log Out{" "}
          </button>
          <p style={{ display: message === "" ? "none" : "block" }}>
            {message}
          </p>
          <Togglable buttonLabel="New Blog" ref={blogFormRef}>
            <BlogForm
              user={user}
              setMessage={setMessage}
              setBlogs={setBlogs}
              blogs={blogs}
              toggleVisibility={toggleVisibility}
            />
          </Togglable>
        </div>
      )}

      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          setBlogs={setBlogs}
          blogs={blogs}
          user={user}
        />
      ))}
    </div>
  );
};

export default App;
