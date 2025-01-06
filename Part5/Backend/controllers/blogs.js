const blogsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");
const User = require("../models/user");

//Get ALL the Blogs
// blogsRouter.get("/api/blogs", (request, response) => {
//   Blog.find({}).then((blogs) => {
//     response.json(blogs);
//   });
// });

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

//!Async Await method
blogsRouter.get("/api/blogs", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
  });
  response.json(blogs);
});

// blogsRouter.post("/api/blogs", (request, response) => {
//   const blog = new Blog(request.body);

//   blog.save().then((result) => {
//     response.status(201).json(result);
//   });
// });

blogsRouter.post("/api/blogs", async (request, response) => {
  const { title, author, url, likes, userId } = request.body;
  if (!title || !url) {
    return response.status(400).json({ error: "Title and URL are required" });
  }
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes || 0,
    user: user.id, // Default to 0 if likes is not provided
  });
  try {
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.status(201).json(savedBlog);
  } catch (exception) {
    console.log(exception);
  }
});

//!Deleteing a blog
blogsRouter.delete("/api/blogs/:id", async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

// blogsRouter.put("/api/blogs/:id", async (request, response) => {
//   const { likes } = request.body;

//   try {
//     // Find the blog by ID and update the likes
//     const updatedBlog = await Blog.findByIdAndUpdate(
//       request.params.id,
//       { $inc: { likes: 1 } },
//       { new: true }
//     );

//     if (!updatedBlog) {
//       return response.status(404).json({ error: "Blog not found" });
//     }

//     response.json(updatedBlog);
//   } catch (error) {
//     response.status(400).json({ error: "Invalid ID format" });
//   }
// });

blogsRouter.put("/api/blogs/:id", async (request, response) => {
  const { title, author, url, likes, user } = request.body;

  const blogData = {
    title,
    author,
    url,
    likes,
    user, // Ensure the user field is correctly included
  };

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      blogData,
      { new: true, runValidators: true } // Return the updated blog and validate data
    );

    if (!updatedBlog) {
      return response.status(404).json({ error: "Blog not found" });
    }

    response.json(updatedBlog);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});

module.exports = blogsRouter;
