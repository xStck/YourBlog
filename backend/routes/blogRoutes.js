const express = require("express");
const { getBlogs, addNewBlog, updateBlog, getBlogDetailsById, deleteBlog, getUserBlogs } = require('../controllers/blogController');
const { verifyToken } = require('../middleware/verifyToken');
const blogRouter = express.Router();

blogRouter.get("/", verifyToken, getBlogs);
blogRouter.post("/addnewblog", verifyToken ,addNewBlog);
blogRouter.put("/updateblog/:id", verifyToken ,updateBlog);
blogRouter.get("/:id", getBlogDetailsById);
blogRouter.get("/user/:id", verifyToken, getUserBlogs);
blogRouter.delete("/:id", verifyToken, deleteBlog);
module.exports = blogRouter;