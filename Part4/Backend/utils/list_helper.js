const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogList) => {
  if (blogList.length === 0) {
    return 0; // Return 0 for an empty array
  }
  let totalLikes = blogList.reduce((sum, blog) => sum + blog.likes, 0);
  return totalLikes;
};

module.exports = {
  dummy,
  totalLikes,
};
