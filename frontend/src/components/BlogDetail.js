import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios"
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'

const BlogDetail = () => {
  const navigator = useNavigate();
  const [thisBlog, setthisBlog] = useState();
  const id = useParams().id;
  const [userInputs, setuserInputs] = useState();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setuserInputs((previousState) => ({
      ...previousState,
      [name]: value
    }));
  };

  const sendUpdateBlogRequest = async() => {
    const response = await axios.put(`http://localhost:8080/api/blog/updateblog/${id}`, {
      title: userInputs.title,
      description: userInputs.description,
    }).catch(error => console.log(error))
    const responseData = await response.data
    return responseData
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendUpdateBlogRequest().then(()=>navigator("/userblogs"))
  };

  const fetchDetails = async () => {
    const response = await axios.get(`http://localhost:8080/api/blog/${id}`).catch(error => console.log(error))
    const responseData = await response.data
    return responseData
  };

  useEffect(() => {
    fetchDetails().then(responseData => {
      setthisBlog(responseData.blog)
      setuserInputs({
        title: responseData.blog.title,
        description: responseData.blog.description,
      })
    })
  }, [id]);


  return (
    <div>
      {userInputs &&
        <form onSubmit={handleSubmit}>
          <Box
            display="flex"
            flexDirection={"column"}
            boxShadow="10px 10px 20px #000"
            padding={3}
            margin={"auto"}
            marginTop={5}
            borderRadius={10}
            width={"80%"}>
            <Typography variant="h3" fontWeight={"bold"} padding={3} textAlign="center">
              Dodaj Bloga
            </Typography>
            <InputLabel sx={{ mb: 1, mt: 2, fontSize: "20px" }} >Tytuł</InputLabel>
            <TextField placeholder="Tytuł" onChange={handleChange} margin="normal" name="title" value={userInputs.title} variant="outlined" />
            <InputLabel sx={{ mb: 1, mt: 2, fontSize: "20px" }}>Opis</InputLabel>
            <TextField placeholder="Opis" onChange={handleChange} margin="normal" name="description" value={userInputs.description} variant="outlined" />
            <Button type="submit" variant="contained" mode="dark" sx={{ margin: 1, background: "black" }}>Dodaj</Button>
          </Box>
        </form>
      }
    </div>
  )
}

export default BlogDetail