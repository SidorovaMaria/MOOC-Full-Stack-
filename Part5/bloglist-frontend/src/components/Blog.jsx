import Togglable from "./Togglable";
import blogService from "../services/blogs";
const Blog = ({ blog, setBlogs, blogs, user }) => {
  const AddLike = async () => {
    try {
      const updatedBlog = {
        ...blog,
        likes: blog.likes + 1,
        user: blog.user.id,
      };
      const returnedBlog = await blogService.update(blog.id, updatedBlog);

      setBlogs(blogs.map((b) => (b.id === blog.id ? returnedBlog : b)));
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };
  const deleteBlog = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the blog "${blog.title} by ${blog.title}"?`
    );
    if (!confirmed) return;
    try {
      await blogService.deleteBlog(blog.id);
      setBlogs(blogs.filter((b) => b.id !== blog.id));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="blog">
      <p className="title">{blog.title} </p>
      <Togglable buttonLabel="View">
        <div className="blog-more">
          <p>
            URl: <span>{blog.url}</span>
          </p>
          <div className="likes">
            <p>
              Likes: <span> {blog.likes}</span>
            </p>
            <button onClick={AddLike} className="toggle-btn">
              Like
            </button>
          </div>
        </div>
      </Togglable>
      <p className="author">By {blog.author}</p>
      {user && user.name === blog.user.name ? (
        <button className="delete-btn" onClick={deleteBlog}>
          Delete
        </button>
      ) : null}
    </div>
  );
};

export default Blog;
