import { TextField, Typography, Box, Button } from '@mui/material'
import React, { useState } from 'react'

const Auth = () => {
  const [isSignedUp, setisSignedUp] = useState(false)
  const [userInputs, setuserInputs] = useState({
    name: "",
    email: "",
    password: ""
  })

  const handleChange = (event) => {
    const { name, value } = event.target;
    setuserInputs((previousState) => ({
      ...previousState,
      [name] : value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(userInputs);
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
            <TextField name="name" onChange={handleChange} value={userInputs.name} placeholder="Imię" margin="normal" />
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