import express from 'express';
import { getBlogs, addNewBlog, updateBlog, getBlogDetailsById } from '../controllers/blogController';

const blogRouter = express.Router();

blogRouter.get("/", getBlogs);
blogRouter.post("/addnewblog", addNewBlog);
blogRouter.put("/updateblog/:id", updateBlog);
blogRouter.get("/:id", getBlogDetailsById);
export default blogRouter;