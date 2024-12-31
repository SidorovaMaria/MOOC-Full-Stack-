const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");
const blogs = require("../db");
const listWithOneBlog = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
    likes: 5,
    __v: 0,
  },
];

test("dummy returns one", () => {
  const blogs = [];
  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

describe("total likes", () => {
  test("of empty list is zero", () => {
    assert.strictEqual(listHelper.totalLikes([]), 0);
  });

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    assert.strictEqual(result, 5);
  });

  test("of a bigger list is calculated right", () => {
    assert.strictEqual(listHelper.totalLikes(blogs), 36);
  });
});

describe("favourite blog", () => {
  test("is itself a favourite blog if one", () => {
    const expected = {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      likes: 5,
    };
    assert.deepStrictEqual(listHelper.favoriteBlog(listWithOneBlog), expected);
  });
  test("of an empty array is zero", () => {
    assert.strictEqual(listHelper.favoriteBlog([]), 0);
  });
  test("of a bigger array is found", () => {
    const expected = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    };
    assert.deepStrictEqual(listHelper.favoriteBlog(blogs), expected);
  });
});

describe("mostBlogs usual", () => {
  test("if empty array returns 0 ", () => {
    assert.strictEqual(listHelper.mostBlogs([]), 0);
  });
  test("return itself is one passed", () => {
    assert.deepStrictEqual(listHelper.mostBlogs(listWithOneBlog), {
      author: "Edsger W. Dijkstra",
      blogs: 1,
    });
  });
  test("if many array are passed the most blogs is found", () => {
    assert.deepStrictEqual(listHelper.mostBlogs(blogs), {
      author: "Robert C. Martin",
      blogs: 3,
    });
  });
});
describe("mostBlogs Lodash", () => {
  test("if empty array returns 0 ", () => {
    assert.strictEqual(listHelper.mostBlogsLodash([]), 0);
  });
  test("return itself is one passed", () => {
    assert.deepStrictEqual(listHelper.mostBlogsLodash(listWithOneBlog), {
      author: "Edsger W. Dijkstra",
      blogs: 1,
    });
  });
  test("if many array are passed the most blogs is found", () => {
    assert.deepStrictEqual(listHelper.mostBlogsLodash(blogs), {
      author: "Robert C. Martin",
      blogs: 3,
    });
  });
});
