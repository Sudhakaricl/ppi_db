import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const storedPassword = localStorage.getItem(username);
    if (storedPassword && storedPassword === password) {
      alert("Login successful!");
      navigate('/home');
    } else {
      alert("Invalid username or password");
    }
  };

  const handleForgotPassword = () => {
    if (!username) {
      alert("Please enter your username to retrieve password.");
      return;
    }
    const storedPassword = localStorage.getItem(username);
    if (storedPassword) {
      alert(`Your password is: ${storedPassword}`);
    } else {
      alert("Username not found.");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8 }}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form onSubmit={handleLogin} noValidate>
          <TextField
            required
            fullWidth
            label="Username"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            required
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>

          <Grid container>
            <Grid item xs>
              <Button variant="text" color="secondary" onClick={handleForgotPassword}>
                Forgot password?
              </Button>
            </Grid>
            <Grid item>
              <Link to="/signup" style={{ textDecoration: 'none' }}>
                <Button variant="text" color="primary">
                  New user? Sign up
                </Button>
              </Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
