import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogCard from './BlogCard';
import { Typography } from '@mui/material';
axios.defaults.withCredentials = true;

const UserBlog = () => {
  const userId = localStorage.getItem("userId");
  const [userAndHisBlogs, setUserAndHisBlogs] = useState();
  const [text, setText] = useState("");
  const sendRequest = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/blog/user/${userId}`, { withCredentials: true });
      const responseData = await response.data;
      return responseData;
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        window.alert(error.response.data.message)
      }
    }
  };

  useEffect(() => {
    sendRequest()
      .then(responseData => {
        setUserAndHisBlogs(responseData.userAndHisBlogs);
        if (responseData.userAndHisBlogs.userBlogs.length > 0) {
          setText("Twoje blogi");
        } else {
          setText("Nie dodałeś/łaś jeszcze żadnego bloga");
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