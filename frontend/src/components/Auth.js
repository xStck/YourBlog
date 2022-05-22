import { TextField, Typography, Box, Button } from '@mui/material';
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom"

const Auth = () => {
  const dispatcher = useDispatch();
  const navigator = useNavigate()
  const [isSignedUp, setisSignedUp] = useState(false)
  const [userInputs, setuserInputs] = useState({
    userName: "",
    email: "",
    password: ""
  })
  const handleChange = (event) => {
    const { name, value } = event.target;
    setuserInputs((previousState) => ({
      ...previousState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(userInputs);
    if (!isSignedUp) {
      sendAuthRequest().then(()=>dispatcher(authActions.login())).then(() => navigator("/allblogs")).then(responseData => console.log(responseData));
    } else {
      sendAuthRequest("signup").then(()=>dispatcher(authActions.login())).then(() => navigator("/allblogs")).then(responseData => console.log(responseData));
    }
  }

  const sendAuthRequest = async (type = "login") => {
    const response = await axios.post(`http://localhost:8080/api/user/${type}`, {
      userName: userInputs.userName,
      email: userInputs.email,
      password: userInputs.password
    }).catch(error => console.log(error));

    const responseData = await response.data;
    return responseData;
  }

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
          <Typography variant="h3">{isSignedUp ? "Zarejestruj się" : "Zaloguj się"}</Typography>
          {isSignedUp &&
            <TextField name="userName" onChange={handleChange} value={userInputs.userName} placeholder="Imię" margin="normal" />
          }
          <TextField name="email" onChange={handleChange} value={userInputs.email} placeholder="Email" type={"email"} margin="normal" />
          <TextField name="password" onChange={handleChange} value={userInputs.password} placeholder="Hasło" type={"password"} margin="normal" />
          <Button type="submit" variant="contained" mode="dark" sx={{ margin: 1, background: "black" }} >{isSignedUp ? "Zarejestruj się" : "Zaloguj się"}</Button>
          <Button onClick={() => setisSignedUp(!isSignedUp)} variant="contained" sx={{ margin: 1, background: "black" }} >{isSignedUp ? "Masz konto? Zaloguj się." : "Nie masz konta? Zarejestruj się."}</Button>
        </Box>
      </form>
    </div>
  )
}

export default Auth