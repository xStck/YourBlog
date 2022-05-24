import { Button, InputLabel, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../store';

const AddBlog = () => {
  const navigator = useNavigate();
  
  const [userInputs, setuserInputs] = useState({
    title: "",
    description: "",
    image: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setuserInputs((previousState) => ({
      ...previousState,
      [name]: value
    }));
  };

  const sendAddBlogRequest = async () => {
    const response = await axios.post("http://localhost:8080/api/blog/addnewblog", {
      title: userInputs.title,
      description: userInputs.description,
      image: userInputs.image,
      user: localStorage.getItem("userId")
    }).catch(error => console.log(error));

    const responseData = await response.data;
    return responseData;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendAddBlogRequest().then(() => navigator("/userblogs"));
  };

  return (
    <div>
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
          <TextField required type="text" placeholder="Tytuł" onChange={handleChange} margin="normal" name="title" value={userInputs.title} variant="outlined" />
          <InputLabel sx={{ mb: 1, mt: 2, fontSize: "20px" }}>Link do obrazka</InputLabel>
          <TextField type="text" placeholder="Link do obrazka" onChange={handleChange} margin="normal" name="image" value={userInputs.image} variant="outlined" />
          <InputLabel sx={{ mb: 1, mt: 2, fontSize: "20px" }}>Opis</InputLabel>
          <TextField required type="text" placeholder="Opis" onChange={handleChange} margin="normal" name="description" value={userInputs.description} variant="outlined" />
          <Button  type="submit" variant="contained" mode="dark" sx={{ margin: 1, background: "black" }}>Dodaj</Button>
        </Box>
      </form>
    </div>
  );
}

export default AddBlog