import React, { useState } from 'react';
import { Container, TextField, Button, MenuItem, Typography, Box } from '@mui/material';
// Import your GraphQL mutation function here

const roles = ['accounts', 'estimators'];

const AddUser = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    role: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call your GraphQL mutation here with formData
    console.log('Submitting:', formData);
    // Example: await API.graphql(...);
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>Add New User</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Full Name"
            name="fullName"
            fullWidth
            margin="normal"
            value={formData.fullName}
            onChange={handleChange}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            label="Mobile"
            name="mobile"
            fullWidth
            margin="normal"
            value={formData.mobile}
            onChange={handleChange}
          />
          <TextField
            select
            label="Role"
            name="role"
            fullWidth
            margin="normal"
            value={formData.role}
            onChange={handleChange}
          >
            {roles.map((role) => (
              <MenuItem key={role} value={role}>
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </MenuItem>
            ))}
          </TextField>
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Create User
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AddUser;
