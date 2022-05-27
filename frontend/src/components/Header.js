import React, { useEffect } from 'react';
import { AppBar, Box, Button, Toolbar, Typography, createTheme, Tabs, Tab } from '@mui/material';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from '@emotion/react';
import { authActions } from '../store';
import axios from 'axios';
axios.defaults.withCredentials = true

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const Header = () => {
  const dispatcher = useDispatch();
  const navigator = useNavigate();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [value, setValue] = React.useState(0);
  const whichTab = useLocation().pathname;

  const sendLogOutRequest = async () => {
    const response = await axios.post("http://localhost:8080/api/user/logout", null, { withCredentials: true })
    if (response.status === 200) {
      return response
    }
    return new Error("Nie można się wylogować. Spróbuj ponownie")
  }

  const sendCheckTokenResponse = async () => {
    const response = await axios.get("http://localhost:8080/api/user/checktokenexpired", { withCredentials: true })
    const checkExpired = response.data.expired
    return checkExpired
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLogout = () => {
    sendLogOutRequest().then(() => dispatcher(authActions.logout()))
  };

  useEffect(() => {
    if (whichTab === "/allblogs") {
      setValue(0);
    } else if (whichTab === "/userblogs") {
      setValue(1);
    } else if (whichTab === "/allblogs/add") {
      setValue(2);
    }

    if(!localStorage.getItem("userId") && isLoggedIn){
      handleLogout();
    }

    sendCheckTokenResponse().then(ifExpired => {
      console.log(ifExpired)
      if(ifExpired === true){
        dispatcher(authActions.logout());
      }
    })
  }, [whichTab, dispatcher, isLoggedIn])


  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="sticky">
        <Toolbar>
          <Button onClick={() => { navigator("/allblogs"); setValue(0) }} variant="text" sx={{ margin: 1, color: 'white' }} >
            <Typography variant="h3">YourBlog</Typography>
          </Button>
          {isLoggedIn && (
            <Box display="flex" marginLeft="auto" marginRight="auto">
              <Tabs textColor="inherit" value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto">
                <Tab LinkComponent={Link} to="/allblogs" label="Wszystkie blogi" sx={{ margin: 1 }} />
                <Tab LinkComponent={Link} to="/userblogs" label="Moje Blogi" sx={{ margin: 1 }} />
                <Tab LinkComponent={Link} to="/allblogs/add" label="Dodaj blog" sx={{ margin: 1 }} />
              </Tabs>
            </Box>
          )}

          <Box display="flex" marginLeft="auto">
            {!isLoggedIn &&
              <>
                <Button onClick={() => navigator("/login")} variant="outlined" sx={{ margin: 1, color: 'white' }} >Zaloguj</Button>
                <Button onClick={() => navigator("/signup")} variant="outlined" sx={{ margin: 1, color: 'white' }} >Zarejestruj</Button>
              </>
            }
            {isLoggedIn && (
              <Button variant="outlined" onClick={handleLogout} LinkComponent={Link} to="/" sx={{ margin: 1, color: 'white' }} >Wyloguj</Button>
            )
            }
          </Box>

        </Toolbar>
      </AppBar>
    </ThemeProvider>
  )
}

export default Header