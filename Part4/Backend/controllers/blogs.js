const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

//Get ALL the Blogs
// blogsRouter.get("/api/blogs", (request, response) => {
//   Blog.find({}).then((blogs) => {
//     response.json(blogs);
//   });
// });

//!Async Await method
blogsRouter.get("/api/blogs", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

// blogsRouter.post("/api/blogs", (request, response) => {
//   const blog = new Blog(request.body);

//   blog.save().then((result) => {
//     response.status(201).json(result);
//   });
// });

blogsRouter.post("/api/blogs", async (request, response) => {
  const { title, author, url, likes } = request.body;
  if (!title || !url) {
    return response.status(400).json({ error: "Title and URL are required" });
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes || 0, // Default to 0 if likes is not provided
  });
  try {
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
  } catch (exception) {
    console.log(exception);
  }
});

module.exports = blogsRouter;

// blogsRouter.post("/api/blogs", async (request, response, next) => {
//   try {
//     const blog = new Blog(request.body);

//     const savedBlog = await blog.save();

//     response.status(201).json(savedBlog);
//   } catch (error) {
//     console.error("Error saving blog:", error.message); // Log the error
//     next(error); // Forward the error to the middleware
//   }
// });
