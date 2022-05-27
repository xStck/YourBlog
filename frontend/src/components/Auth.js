import { TextField, Typography, Box, Button } from '@mui/material';
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { authActions } from "../store";
import { useLocation, useNavigate } from "react-router-dom";

const Auth = () => {
  const dispatcher = useDispatch();
  const navigator = useNavigate();
  const [correctUserName, setCorrectUserName] = useState(true);
  const [correctEmail, setCorrectEmail] = useState(true);
  const [correctPassword, setCorrectPassword] = useState(true);
  var isCorrectValidation = false;
  var loginOrSignUp = useLocation().pathname;

  const [userInputs, setuserInputs] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const validation = (values) => {
    const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const regexPassword = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/; //min 1 cyfra, 1 mała litera, 1 duża litera, 8 znaków, 1 znak spejalny
    const regexUserName = /^[a-zA-Z0-9]+$/;
    setCorrectEmail(true);
    setCorrectUserName(true);
    setCorrectPassword(true);
    isCorrectValidation = true

    if (!regexUserName.test(values.userName) && loginOrSignUp === "/signup") {
      setCorrectUserName(false);
      isCorrectValidation = false;
    }

    if (!regexEmail.test(values.email)) {
      setCorrectEmail(false);
      isCorrectValidation = false;
    }

    if (!regexPassword.test(values.password)) {
      setCorrectPassword(false);
      isCorrectValidation = false;
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setuserInputs((previousState) => ({
      ...previousState,
      [name]: value
    }));
  };

  const sendLoginRequest = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/api/user/login`, {
        email: userInputs.email,
        password: userInputs.password
      });

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

  const sendSignUpRequest = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/api/user/signup`, {
        userName: userInputs.userName,
        email: userInputs.email,
        password: userInputs.password
      });

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
    if (loginOrSignUp === "/login") {
      if (isCorrectValidation) {
        sendLoginRequest()
          .then(responseData => {
            localStorage.setItem("userId", responseData.loggedUser._id);
          })
          .then(() => dispatcher(authActions.login()))
          .then(() => navigator("/allblogs"));
      }
    } else {
      if (isCorrectValidation) {
        sendSignUpRequest()
          .then(() => navigator("/login"));
      }
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
          <Typography variant="h3">{loginOrSignUp === "/signup" ? "Zarejestruj się" : "Zaloguj się"}</Typography>
          {loginOrSignUp === "/signup" &&
            <TextField name="userName" type="text" onChange={handleChange} value={userInputs.userName} placeholder="Imię" margin="normal" variant="standard" />
          }
          {!correctUserName && (
            <Typography variant="h6" sx={{ color: 'red' }} textAlign="left">
              Podano nieprawidłową nazwę użytkownika.
            </Typography>
          )}
          <TextField name="email" onChange={handleChange} value={userInputs.email} placeholder="Email" type={"email"} margin="normal" variant="standard" />
          {!correctEmail && (
            <Typography variant="h6" sx={{ color: 'red' }} textAlign="left">
              Podano nieprawidłowy adres e-mail.
            </Typography>
          )}
          <TextField name="password" onChange={handleChange} value={userInputs.password} placeholder="Hasło" type='password' margin="normal" variant="standard" />
          {!correctPassword && (
            <>
              <Box
                maxWidth={600}
                display="flex"
                flexDirection={"column"}
                alignItems="left"
                justifyContent="left"
                margin="auto">
                <Typography variant="h6" sx={{ color: 'red' }}>
                  Podano nieprawidłowe hasło.
                </Typography>
                {loginOrSignUp === "/signup" && (
                  <>
                    <Typography variant="h6" sx={{ color: 'red' }}>
                      Hasło powinno składać się z:
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'red' }}>
                      * Minimum 8 znaków
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'red' }}>
                      * Minimum 1 wielkiej litery
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'red' }}>
                      * Minimum 1 małej litery
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'red' }}>
                      * Minimum 1 znaku specjalnego
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'red' }}>
                      * Minimum 1 cyfry
                    </Typography>
                  </>
                )}
              </Box>
            </>
          )}
          <Button type="submit" variant="contained" mode="dark" sx={{ margin: 1, background: "black" }} >{loginOrSignUp === "/signup" ? "Zarejestruj się" : "Zaloguj się"}</Button>
        </Box>
      </form>
    </div>
  )
}

export default Auth