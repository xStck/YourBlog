import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BlogCard from './BlogCard';

const UserBlog = () => {
  const userId = localStorage.getItem("userId");
  const [userBlogs, setUserBlogs] = useState()

  const sendRequest = async () => {
    const response = await axios.get(`http://localhost:8080/api/blog/user/${userId}`)
      .catch(error => console.log(error));
    const responseData = await response.data;
    return responseData;
  };

  useEffect(() => {
    sendRequest().then(responseData => setUserBlogs(responseData.userAndHisBlogs.userBlogs))
  }, []);

  return (
    <div>
      {userBlogs && userBlogs.map((singleBlog, index) => (
        <BlogCard title={singleBlog.title} description={singleBlog.description} image={singleBlog.image} user={singleBlog.user.userName} />
      ))}
    </div>
  )
}

export default UserBlog