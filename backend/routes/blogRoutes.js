import express from 'express';
import { getBlogs, addNewBlog } from '../controllers/blogController';

const blogRouter = express.Router();

blogRouter.get("/", getBlogs);
blogRouter.post("/addnewblog", addNewBlog);
export default blogRouter;