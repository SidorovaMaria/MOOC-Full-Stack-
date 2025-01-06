import React, { useRef, useState } from "react";
import blogService from "../services/blogs";

const BlogForm = ({ setMessage, setBlogs, blogs, user, toggleVisibility }) => {
  const [blog, setBlog] = useState({
    author: "",
    title: "",
    url: "",
  });

  const addBlog = (e) => {
    e.preventDefault();
    const blogObject = {
      author: user.name,
      title: blog.title,
      url: blog.url,
    };
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      setBlog({
        // author: "",
        title: "",
        url: "",
      });
    });
    setMessage(`Blog "${blog.title}" by ${blog.author} is succesfully added`);
    toggleVisibility();
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  return (
    <div className="blogForm">
      <h2>Create a New Blog</h2>
      <form onSubmit={addBlog}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            required
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
        {/* <div>
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
        </div> */}
        <div>
          <label htmlFor="url">Url:</label>
          <input
            id="url"
            type="text"
            required
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
    </div>
  );
};

export default BlogForm;
