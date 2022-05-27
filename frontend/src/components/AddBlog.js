import { Button, InputLabel, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
axios.defaults.withCredentials = true;

const AddBlog = () => {
  const navigator = useNavigate();
  const [correctTitle, setCorrectTitle] = useState(true);
  const [correctDescription, setCorrectDescription] = useState(true);
  const [correctImage, setCorrectImage] = useState(true);
  var isCorrectValidation = false;

  const [userInputs, setuserInputs] = useState({
    title: "",
    description: "",
    image: "",
  });

  const isValidHttpUrl = (string) => {
    let url;

    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
  };

  const validation = (values) => {
    const regexIsImage = /\.(jpg|jpeg|png|webp|avif|gif|svg)$/;
    setCorrectTitle(true);
    setCorrectDescription(true);
    setCorrectImage(true);
    isCorrectValidation = true;

    if (values.title.trim() === '') {
      setCorrectTitle(false);
      isCorrectValidation = false;
    }

    if (values.description.trim() === '') {
      setCorrectDescription(false);
      isCorrectValidation = false;
    }

    if (values.image.trim() !== '') {
      if (!isValidHttpUrl(values.image) || !regexIsImage.test(values.image)) {
        setCorrectImage(false);
        isCorrectValidation = false;
      }
    } else {
      userInputs.image = ''
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setuserInputs((previousState) => ({
      ...previousState,
      [name]: value
    }));
  };

  const sendAddBlogRequest = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/blog/addnewblog", {
        title: userInputs.title,
        description: userInputs.description,
        image: userInputs.image,
        user: localStorage.getItem("userId")
      }, { withCredentials: true });

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

  const handleSubmit = (event) => {
    event.preventDefault();
    validation(userInputs);

    if (isCorrectValidation) {
      sendAddBlogRequest().then(() => navigator("/userblogs"));
    }
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
          <Typography variant="h3" padding={3} textAlign="center">
            Dodaj Bloga
          </Typography>
          <InputLabel sx={{ mb: 1, mt: 2, fontSize: "20px" }} >Tytuł</InputLabel>
          <TextField type="text" placeholder="Tytuł" onChange={handleChange} margin="normal" name="title" value={userInputs.title} variant="outlined" />
          {!correctTitle && (
            <Typography variant="h6" sx={{ color: 'red' }} textAlign="left">
              Tytuł jest wymagany.
            </Typography>
          )}
          <InputLabel sx={{ mb: 1, mt: 2, fontSize: "20px" }}>Link do obrazka</InputLabel>
          <TextField type="text" placeholder="Link do obrazka (opcjonalny)" onChange={handleChange} margin="normal" name="image" value={userInputs.image} variant="outlined" />
          {!correctImage && (
            <Typography variant="h6" sx={{ color: 'red' }} textAlign="left">
              Podano nieprawidłowy link.
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
    </div>
  );
}

export default AddBlog