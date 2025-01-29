import React from 'react';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import { PeopleAlt, CreditCard, Description, Business } from '@mui/icons-material';

const DashboardCard = ({ title, value, icon, color }) => (
  <Card sx={{ height: '100%', backgroundColor: color }}>
    <CardContent>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h6" component="div" color="white">
            {title}
          </Typography>
          <Typography variant="h4" component="div" color="white">
            {value}
          </Typography>
        </Box>
        <Box>
          {icon}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const AdminDashboard = () => {
  const cards = [
    {
      title: 'Cards',
      value: '1,234',
      icon: <CreditCard sx={{ fontSize: 40, color: 'white' }} />,
      color: '#1976d2'
    },
    {
      title: 'Reports',
      value: '56',
      icon: <Description sx={{ fontSize: 40, color: 'white' }} />,
      color: '#2e7d32'
    },
    {
      title: 'Customers',
      value: '89',
      icon: <Business sx={{ fontSize: 40, color: 'white' }} />,
      color: '#ed6c02'
    },
    {
      title: 'Users',
      value: '45',
      icon: <PeopleAlt sx={{ fontSize: 40, color: 'white' }} />,
      color: '#9c27b0'
    }
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Admin Dashboard
      </Typography>
      <Grid container spacing={3}>
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <DashboardCard {...card} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
