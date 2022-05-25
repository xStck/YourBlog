import { TextField, Typography, Box, Button } from '@mui/material';
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { authActions } from "../store";
import { useLocation, useNavigate } from "react-router-dom"

const Auth = () => {
  const dispatcher = useDispatch();
  const navigator = useNavigate();
  var loginOrSignUp = useLocation().pathname;
  const [userInputs, setuserInputs] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setuserInputs((previousState) => ({
      ...previousState,
      [name]: value
    }));
  };

  const sendAuthRequest = async (type = loginOrSignUp) => {
    const response = await axios.post(`http://localhost:8080/api/user/${type}`, {
      userName: userInputs.userName,
      email: userInputs.email,
      password: userInputs.password
    }).catch(error => console.log(error));
    const responseData = await response.data;
    return responseData;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (loginOrSignUp === "/login") {
      sendAuthRequest("login")
        .then(responseData => {
          localStorage.setItem("userId", responseData.loggedUser._id);
          localStorage.setItem("token", responseData.token)
        })
        .then(() => dispatcher(authActions.login()))
        .then(() => navigator("/allblogs"));
    } else {
      sendAuthRequest("signup")
        .then(responseData => 
          {
            localStorage.setItem("userId", responseData.newUser._id)
            localStorage.setItem("token", responseData.token)
          })
        .then(() => dispatcher(authActions.login()))
        .then(() => navigator("/allblogs"));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={600}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent="center"
          boxShadow="10px 10px 20px #000"
          padding={5}
          margin="auto"
          marginTop={5}
          borderRadius={10}
        >
          <Typography variant="h3">{loginOrSignUp ==="/signup" ? "Zarejestruj się" : "Zaloguj się"}</Typography>
          {loginOrSignUp === "/signup" &&
            <TextField required name="userName" type="text" onChange={handleChange} value={userInputs.userName} placeholder="Imię" margin="normal" variant="standard" />
          }
          <TextField required name="email" onChange={handleChange} value={userInputs.email} placeholder="Email" type={"email"} margin="normal" variant="standard" />
          <TextField required name="password" onChange={handleChange} value={userInputs.password} placeholder="Hasło" type='password' margin="normal" variant="standard" />
          <Button type="submit" variant="contained" mode="dark" sx={{ margin: 1, background: "black" }} >{loginOrSignUp === "/signup" ? "Zarejestruj się" : "Zaloguj się"}</Button>
        </Box>
      </form>
    </div>
  )
}

export default Auth