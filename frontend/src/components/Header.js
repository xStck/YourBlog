import React, { useState } from 'react';
import { AppBar, Box, Button, Toolbar, Typography, createTheme, Tabs, Tab } from '@mui/material';
import { Link } from "react-router-dom";
import { ThemeProvider } from '@emotion/react';
import { useSelector } from "react-redux";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const Header = () => {
  const [value, setValue] = React.useState(0);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
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
              <Tabs textColor="inherit" value={value} onChange={handleChange}>
                <Tab LinkComponent={Link} to="/allblogs" label="Wszystkie blogi" sx={{ margin: 1 }} />
                <Tab LinkComponent={Link} to="/userblogs" label="Moje Blogi" sx={{ margin: 1 }} />
              </Tabs>
            </Box>
          )}

          <Box display="flex" marginLeft="auto">
            {!isLoggedIn &&
              <>
                <Button LinkComponent={Link} to="/auth" variant="outlined" sx={{ margin: 1, color: 'white' }} >Zaloguj</Button>
                <Button LinkComponent={Link} to="/auth" variant="outlined" sx={{ margin: 1, color: 'white' }} >Zarejestruj</Button>
              </>
            }
            {isLoggedIn && (
              <Button variant="outlined" sx={{ margin: 1, color: 'white' }} >Wyloguj</Button>
            )
            }
          </Box>

        </Toolbar>
      </AppBar>
    </ThemeProvider>
  )
}

export default Header