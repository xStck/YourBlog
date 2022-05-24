import React, { useEffect, useState } from 'react';
import { AppBar, Box, Button, Toolbar, Typography, createTheme, Tabs, Tab } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h3">YourBlog</Typography>

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