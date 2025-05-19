import React, { useState } from "react";
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import { poolData } from "./awsConfig";  // adjust path if needed
import { TextField, Button, Container, Typography, Link, Box } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const user = new CognitoUser({
      Username: email,
      Pool: new CognitoUserPool(poolData),
    });

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (result) => {
        console.log("Login success:", result);
        navigate('/dashboard');
      },
      onFailure: (err) => {
        alert(err.message || JSON.stringify(err));
      },
    });
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Typography variant="h4" align="center" gutterBottom>Login</Typography>
      <form onSubmit={handleLogin}>
        <TextField 
          label="Email" 
          fullWidth 
          margin="normal" 
          onChange={e => setEmail(e.target.value)} 
          required
        />
        <TextField 
          label="Password" 
          type="password" 
          fullWidth 
          margin="normal" 
          onChange={e => setPassword(e.target.value)} 
          required
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Login
        </Button>
      </form>

      <Box mt={2} textAlign="center">
        <Typography variant="body2">
          Don't have an account?{' '}
          <Link component={RouterLink} to="/signup" underline="hover">
            Sign Up
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
