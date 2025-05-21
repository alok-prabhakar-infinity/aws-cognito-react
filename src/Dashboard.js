import React, { useEffect } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import userPool from './awsConfig';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = userPool.getCurrentUser();
    if (!user) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    const user = userPool.getCurrentUser();
    if (user) {
      user.signOut();
    }
    navigate('/');
  };

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={4}>
        <Typography variant="h3">Welcome to Dashboard!</Typography>
        <Box>
          <Button variant="contained" color="primary" onClick={() => navigate('/add-user')} sx={{ mr: 2 }}>
            Add User
          </Button>
          <Button variant="outlined" color="error" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Dashboard;
