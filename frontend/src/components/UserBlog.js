import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BlogCard from './BlogCard';
import { Typography } from '@mui/material';

const UserBlog = () => {
  const userId = localStorage.getItem("userId");
  const [userAndHisBlogs, setUserAndHisBlogs] = useState()
  const [blogsExist, setblogsExist] = useState()
  const [text, setText] = useState("")
  const sendRequest = async () => {
    const response = await axios.get(`http://localhost:8080/api/blog/user/${userId}`)
      .catch(error => console.log(error));
    const responseData = await response.data;
    return responseData;
  };

  useEffect(() => {
    sendRequest()
      .then(responseData => {
        setUserAndHisBlogs(responseData.userAndHisBlogs)
        if (responseData.userAndHisBlogs.userBlogs.length > 0) {
          setText("Twoje blogi")
          setblogsExist(true);
        } else {
          setText("Nie dodałeś/łaś jeszcze żadnego bloga")
          setblogsExist(false);
        }
      })
  }, []);

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
        variant="h3">
        {text}</Typography>
      {userAndHisBlogs &&
        userAndHisBlogs.userBlogs &&
        userAndHisBlogs.userBlogs.map((singleBlog, index) => (
          <BlogCard
            key={index}
            id={singleBlog._id}
            isUser={true}
            title={singleBlog.title}
            description={singleBlog.description}
            image={singleBlog.image}
            user={userAndHisBlogs.userName}
          />
        ))
      }
    </div>
  )
}

export default UserBlog