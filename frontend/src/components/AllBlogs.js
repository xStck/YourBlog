import React, { useEffect, useState } from 'react';
import axios from "axios";
import BlogCard from './BlogCard';
import { Typography } from '@mui/material';
axios.defaults.withCredentials = true
const AllBlogs = () => {
  const [allBlogs, setAllBlogs] = useState();
  const [text, setText] = useState("");

  const sendBlogsRequest = async () => {
    const response = await axios.get("http://localhost:8080/api/blog",{
      withCredentials: true
    }).catch(error => console.log(error));
    const responseData = await response.data;
    return responseData;
  };

  useEffect(() => {
    sendBlogsRequest().then(responseData => {
      setAllBlogs(responseData.blogs)
      if (responseData.blogs.length > 0) {
        setText("Blogi")
        console.log(responseData.blogs)
      } else {
        setText("Nikt jeszcze nie dodał żadnego bloga")
      }
    });
  }, [])

  return (
    <div>
      <Typography
        display="flex"
        flexDirection={"column"}
        alignItems="center"
        justifyContent="center"
        padding={5}
        margin="auto"
        marginTop={5}
        borderRadius={10}
        variant="h3">{text}</Typography>
      {allBlogs && allBlogs.map((singleBlog, index) => (
        <BlogCard
          id={singleBlog._id}
          isUser={localStorage.getItem("userId") === singleBlog.user._id}
          title={singleBlog.title}
          description={singleBlog.description}
          image={singleBlog.image}
          user={singleBlog.user.userName}
        />
      ))}
    </div>
  )
}

export default AllBlogs