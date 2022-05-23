import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BlogCard from './BlogCard';

const UserBlog = () => {
  const userId = localStorage.getItem("userId");
  const [userAndHisBlogs, setUserAndHisBlogs] = useState()

  const sendRequest = async () => {
    const response = await axios.get(`http://localhost:8080/api/blog/user/${userId}`)
      .catch(error => console.log(error));
    const responseData = await response.data;
    return responseData;
  };

  useEffect(() => {
    sendRequest().then(responseData => setUserAndHisBlogs(responseData.userAndHisBlogs))
  }, []);

  return (
    <div>
      {userAndHisBlogs && userAndHisBlogs.userBlogs && userAndHisBlogs.userBlogs.map((singleBlog, index) => (
        <BlogCard key={index}
         title={singleBlog.title} description={singleBlog.description} image={singleBlog.image} user={userAndHisBlogs.userName} 
         />
         
      ))}
    </div>
  )
}

export default UserBlog