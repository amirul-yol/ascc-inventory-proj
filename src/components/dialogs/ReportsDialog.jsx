import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Grid,
  Card,
  CardContent,
  CardMedia,
  CircularProgress
} from '@mui/material';

const ReportsDialog = ({ onClose = () => {} }) => {
  const navigate = useNavigate();
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await fetch('http://localhost/inventoryproj/server/api/banks/read.php');
        const data = await response.json();
        
        if (data.records) {
          setBanks(data.records);
        } else {
          setError('No banks found');
        }
      } catch (err) {
        setError('Failed to fetch banks');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBanks();
  }, []);

  const handleBankClick = (bankId) => {
    if (onClose) {
      onClose();
    }
    navigate(`/reports/${bankId}`);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={300}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={300}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2, maxHeight: '70vh', overflowY: 'auto' }}>
      <Grid container spacing={2}>
        {banks.map((bank) => (
          <Grid item xs={12} sm={6} key={bank.id}>
            <Card 
              sx={{ 
                display: 'flex',
                height: '100%',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  cursor: 'pointer'
                }
              }}
              onClick={() => handleBankClick(bank.id)}
            >
              <CardMedia
                component="img"
                sx={{ 
                  width: 100,
                  p: 2,
                  objectFit: 'contain',
                  backgroundColor: 'white'
                }}
                image={bank.imgURL}
                alt={bank.name}
              />
              <CardContent sx={{ flex: 1, p: 2, display: 'flex', alignItems: 'center' }}>
                <Typography variant="h6" component="div" sx={{ fontSize: '1rem' }}>
                  {bank.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ReportsDialog;
