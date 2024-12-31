var _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogsArray) => {
  if (blogsArray.length === 0) {
    return 0; // Return 0 for an empty array
  }
  let totalLikes = blogsArray.reduce((sum, blog) => sum + blog.likes, 0);
  return totalLikes;
};

const favoriteBlog = (blogsArray) => {
  if (blogsArray.length === 0) {
    return 0;
  }
  const favorite = blogsArray.reduce((fav, blog) =>
    (fav.likes || 0) > blog.likes ? fav : blog
  );
  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  };
};
// Without LODASH
const mostBlogs = (blogsArray) => {
  if (blogsArray.length === 0) {
    return 0;
  }
  const authorBlogCounts = {};
  //count the number of blogs for each author
  blogsArray.forEach((blog) => {
    authorBlogCounts[blog.author] = (authorBlogCounts[blog.author] || 0) + 1;
  });
  const topAuthor = Object.entries(authorBlogCounts).reduce(
    (top, [author, count]) =>
      count > top.blogs ? { author, blogs: count } : top,
    { author: "", blogs: 0 }
  );
  return topAuthor;
};
const mostBlogsLodash = (blogsArray) => {
  if (blogsArray.length === 0) {
    return 0;
  }

  // Group blogs by author
  const groupedBlogs = _.groupBy(blogsArray, "author");

  // Map the grouped result to get each author's blog count
  const authorBlogCounts = _.map(groupedBlogs, (blogs, author) => ({
    author,
    blogs: blogs.length,
  }));

  // Find the author with the most blogs
  const topAuthor = _.maxBy(authorBlogCounts, "blogs");

  return topAuthor;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostBlogsLodash,
};
