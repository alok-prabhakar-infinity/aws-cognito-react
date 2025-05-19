import React, { useState } from 'react';
import { CognitoUserPool, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { poolData } from './awsConfig';
import { TextField, Button, Container, Typography } from '@mui/material';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const pool = new CognitoUserPool(poolData);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare user attributes array
    const attributeList = [];

    // Add phone number attribute (must be in E.164 format, e.g. +1234567890)
    if (phoneNumber) {
      attributeList.push(
        new CognitoUserAttribute({
          Name: 'phone_number',
          Value: phoneNumber,
        })
      );
    }

    pool.signUp(email, password, attributeList, null, (err, data) => {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }
      alert('Sign-up successful! Please confirm your email.');
      console.log(data);
    });
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Sign Up</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
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
        <TextField
          label="Phone Number"
          fullWidth
          margin="normal"
          onChange={e => setPhoneNumber(e.target.value)}
          placeholder="+1234567890"
          required
          helperText="Enter phone number in E.164 format, e.g. +1234567890"
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Sign Up
        </Button>
      </form>
    </Container>
  );
};

export default SignUp;
