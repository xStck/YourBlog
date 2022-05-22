import React, { useEffect, useState } from 'react';
import axios from "axios";
import BlogCard from './BlogCard';

const AllBlogs = () => {
  const [allBlogs, setAllBlogs] = useState()
  const sendBlogsRequest = async () => {
    const response = await axios.get("http://localhost:8080/api/blog").catch(error => console.log(error));
    const responseData = await response.data;
    return responseData;
  }
  useEffect(() => {
    sendBlogsRequest().then(responseData => setAllBlogs(responseData.blogs));
  }, [])
  return (
    <div>
      {allBlogs && allBlogs.map((singleBlog, index) => (
        <BlogCard title={singleBlog.title} description={singleBlog.description} image={singleBlog.image} user = {singleBlog.user.userName}/>
      ))}
      </div>
  )
}

export default AllBlogs