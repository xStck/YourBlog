import React, { useEffect, useState } from 'react';
import { AppBar, Box, Button, Toolbar, Typography, createTheme, Tabs, Tab } from '@mui/material';
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from '@emotion/react';
import { authActions } from '../store';

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
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if(whichTab === "/allblogs"){
      setValue(0);
    }else if(whichTab === "/userblogs"){
      setValue(1);
    }else if(whichTab === "/allblogs/add"){
      setValue(2);
    }
  }, [whichTab])
  

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="sticky">
        <Toolbar>
        <Button onClick={()=> {navigator("/allblogs"); setValue(0)}} variant="text" sx={{ margin: 1, color: 'white' }} >
          <Typography variant="h3">YourBlog</Typography>
        </Button>
          {isLoggedIn && (
            <Box display="flex" marginLeft="auto" marginRight="auto">
              <Tabs textColor="inherit" value={value} onChange={handleChange}   variant="scrollable" scrollButtons="auto">
                <Tab  LinkComponent={Link} to="/allblogs" label="Wszystkie blogi" sx={{ margin: 1 }} />
                <Tab  LinkComponent={Link} to="/userblogs" label="Moje Blogi" sx={{ margin: 1 }} />
                <Tab  LinkComponent={Link} to="/allblogs/add" label="Dodaj blog" sx={{ margin: 1 }} />
              </Tabs>
            </Box>
          )}

          <Box display="flex" marginLeft="auto">
            {!isLoggedIn &&
              <>
                <Button onClick={()=> navigator("/login")} variant="outlined" sx={{ margin: 1, color: 'white' }} >Zaloguj</Button>
                <Button onClick={()=> navigator("/signup")} variant="outlined" sx={{ margin: 1, color: 'white' }} >Zarejestruj</Button>
              </>
            }
            {isLoggedIn && (
              <Button variant="outlined" onClick={() => dispatcher(authActions.logout())} LinkComponent = {Link} to="/" sx={{ margin: 1, color: 'white' }} >Wyloguj</Button>
            )
            }
          </Box>

        </Toolbar>
      </AppBar>
    </ThemeProvider>
  )
}

export default Header