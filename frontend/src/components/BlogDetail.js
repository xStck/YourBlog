import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios"
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'
axios.defaults.withCredentials = true

const BlogDetail = () => {
  const navigator = useNavigate();
  const id = useParams().id;
  const [userInputs, setuserInputs] = useState();
  const [correctTitle, setCorrectTitle] = useState(true)
  const [correctDescription, setCorrectDescription] = useState(true)
  var isCorrectValidation = false

  const validation = (values) => {
    setCorrectTitle(true)
    setCorrectDescription(true)
    isCorrectValidation = true
    if (values.title.trim() === '') {
      setCorrectTitle(false)
      isCorrectValidation = false
    }
    if (values.description.trim() === '') {
      setCorrectDescription(false)
      isCorrectValidation = false
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setuserInputs((previousState) => ({
      ...previousState,
      [name]: value
    }));
  };

  const sendUpdateBlogRequest = async () => {
    const response = await axios.put(`http://localhost:8080/api/blog/updateblog/${id}`, {
      title: userInputs.title,
      description: userInputs.description,
    }, {
      withCredentials: true
    }).catch(error => console.log(error))
    const responseData = await response.data
    return responseData
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    validation(userInputs);
    if (isCorrectValidation) {
      sendUpdateBlogRequest().then(() => navigator("/userblogs"))
    }
  };

  const fetchDetails = async () => {
    const response = await axios.get(`http://localhost:8080/api/blog/${id}`, { withCredentials: true }).catch(error => console.log(error))
    const responseData = await response.data
    return responseData
  };

  useEffect(() => {
    fetchDetails().then(responseData => {
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
            <Typography variant="h3" padding={3} textAlign="center">
              Edycja bloga
            </Typography>
            <InputLabel sx={{ mb: 1, mt: 2, fontSize: "20px" }} >Tytuł</InputLabel>
            <TextField type="text" placeholder="Tytuł" onChange={handleChange} margin="normal" name="title" value={userInputs.title} variant="outlined" />
            {!correctTitle && (
              <Typography variant="h6" sx={{ color: 'red' }} textAlign="left">
                Tytuł jest wymagany.
              </Typography>
            )}
            <InputLabel sx={{ mb: 1, mt: 2, fontSize: "20px" }}>Opis</InputLabel>
            <TextField type="text" placeholder="Opis" onChange={handleChange} margin="normal" name="description" value={userInputs.description} variant="outlined" />
            {!correctDescription && (
              <Typography variant="h6" sx={{ color: 'red' }} textAlign="left">
                Opis jest wymagany.
              </Typography>

            )}
            <Button type="submit" variant="contained" mode="dark" sx={{ margin: 1, background: "black" }}>Dodaj</Button>
          </Box>
        </form>
      }
    </div>
  )
}

export default BlogDetail