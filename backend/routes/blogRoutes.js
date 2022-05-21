import express from 'express';
import { getBlogs, addNewBlog, updateBlog, getBlogDetailsById, deleteBlog } from '../controllers/blogController';

const blogRouter = express.Router();

blogRouter.get("/", getBlogs);
blogRouter.post("/addnewblog", addNewBlog);
blogRouter.put("/updateblog/:id", updateBlog);
blogRouter.get("/:id", getBlogDetailsById);
blogRouter.delete("/:id", deleteBlog);
export default blogRouter;