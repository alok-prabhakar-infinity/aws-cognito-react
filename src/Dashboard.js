import React, { useEffect } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import userPool from './awsConfig'; // Update path if needed

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = userPool.getCurrentUser();
    if (!user) {
      navigate('/'); // Redirect to login if no user is logged in
    }
  }, [navigate]);

  const handleLogout = () => {
    const user = userPool.getCurrentUser();
    if (user) {
      user.signOut();
    }
    navigate('/'); // Redirect after logout
  };

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={4}>
        <Typography variant="h3">Welcome to Dashboard!</Typography>
        <Button variant="outlined" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default Dashboard;
