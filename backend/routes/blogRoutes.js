import express from 'express';
import { getBlogs, addNewBlog, updateBlog } from '../controllers/blogController';

const blogRouter = express.Router();

blogRouter.get("/", getBlogs);
blogRouter.post("/addnewblog", addNewBlog);
blogRouter.put("/updateblog/:id", updateBlog);
export default blogRouter;