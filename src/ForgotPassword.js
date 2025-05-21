import React, { useState } from "react";
import { CognitoUserPool, CognitoUser } from "amazon-cognito-identity-js";
import { poolData } from "./awsConfig";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const sendCode = (e) => {
    e.preventDefault();

    const user = new CognitoUser({
      Username: email,
      Pool: new CognitoUserPool(poolData),
    });

    user.forgotPassword({
      onSuccess: (data) => {
        console.log("Code sent:", data);
        setStep(2);
        setMessage("Verification code sent to your email.");
      },
      onFailure: (err) => {
        alert(err.message || JSON.stringify(err));
      },
    });
  };

  const resetPassword = (e) => {
    e.preventDefault();

    const user = new CognitoUser({
      Username: email,
      Pool: new CognitoUserPool(poolData),
    });

    user.confirmPassword(code, newPassword, {
      onSuccess: () => {
        alert("Password reset successful!");
        navigate('/');
        // Optionally redirect to login here
      },
      onFailure: (err) => {
        alert(err.message || JSON.stringify(err));
      },
    });
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Forgot Password
      </Typography>

      {message && (
        <Alert severity="info" sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}

      {step === 1 && (
        <form onSubmit={sendCode}>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Send Code
          </Button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={resetPassword}>
          <TextField
            label="Verification Code"
            fullWidth
            margin="normal"
            required
            onChange={(e) => setCode(e.target.value)}
          />
          <TextField
            label="New Password"
            type="password"
            fullWidth
            margin="normal"
            required
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Reset Password
          </Button>
        </form>
      )}

      <Box mt={2} textAlign="center">
        <Typography variant="body2">
          Remember your password?{" "}
          <Button href="/" variant="text" size="small">
            Login
          </Button>
        </Typography>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
