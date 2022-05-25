const express = require("express");
const { getBlogs, addNewBlog, updateBlog, getBlogDetailsById, deleteBlog, getUserBlogs } = require('../controllers/blogController');
const { verifyToken } = require('../controllers/userController');
const blogRouter = express.Router();

blogRouter.get("/", verifyToken, getBlogs);
blogRouter.post("/addnewblog", addNewBlog);
blogRouter.put("/updateblog/:id", updateBlog);
blogRouter.get("/:id", getBlogDetailsById);
blogRouter.get("/user/:id", getUserBlogs);
blogRouter.delete("/:id", deleteBlog);
module.exports = blogRouter;