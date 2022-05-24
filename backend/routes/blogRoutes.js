import express from 'express';
import { getBlogs, addNewBlog, updateBlog, getBlogDetailsById, deleteBlog, getUserBlogs } from '../controllers/blogController';
import auth from "../middleware/auth.js";

const blogRouter = express.Router();

blogRouter.get("/", getBlogs);
blogRouter.post("/addnewblog", auth, addNewBlog);
blogRouter.put("/updateblog/:id", auth, updateBlog);
blogRouter.get("/:id", auth, getBlogDetailsById);
blogRouter.get("/user/:id", auth, getUserBlogs);
blogRouter.delete("/:id", auth, deleteBlog);
export default blogRouter;