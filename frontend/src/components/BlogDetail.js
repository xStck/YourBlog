import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"

const BlogDetail = () => {
  const [thisBlog, setthisBlog] = useState()
  const id = useParams().id;
  const fetchDetails = async() => {
    const response = await axios.get(`http://localhost:8080/api/blog/${id}`).catch(error => console.log(error))
    const responseData = await response.data
    return responseData
  };

  useEffect(() => {
    fetchDetails().then(responseData => setthisBlog(responseData.blog))
  },[id]);
  console.log(thisBlog)
  return (
    <div>BlogDetail</div>
  )
}

export default BlogDetail