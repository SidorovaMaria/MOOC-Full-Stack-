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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
