import Togglable from "./Togglable";

const Blog = ({ blog }) => {
  return (
    <div className="blog">
      <p className="title">{blog.title} </p>
      <Togglable buttonLabel="View">
        <div className="blog-more">
          <p>
            URl: <span>{blog.url}</span>
          </p>
          <div>
            <p>
              Likes: <span> {blog.likes}</span>
              <button>Like</button>
            </p>
          </div>
        </div>
      </Togglable>
      <p className="author">By {blog.author}</p>
    </div>
  );
};

export default Blog;
