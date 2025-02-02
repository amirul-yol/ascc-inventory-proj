import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Grid,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Button,
  Dialog
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import AddBankForm from '../forms/AddBankForm';

const CustomersDialog = ({ onClose = () => {} }) => {
  const navigate = useNavigate();
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddBankOpen, setIsAddBankOpen] = useState(false);

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

  useEffect(() => {
    fetchBanks();
  }, []);

  const handleBankClick = (bankId) => {
    if (onClose) {
      onClose();
    }
    navigate(`/customers/${bankId}`);
  };

  const handleAddBankClick = () => {
    setIsAddBankOpen(true);
  };

  const handleAddBankClose = () => {
    setIsAddBankOpen(false);
  };

  const handleBankAdded = () => {
    fetchBanks(); // Refresh the banks list
    setTimeout(() => {
      setIsAddBankOpen(false);
    }, 1500); // Close the form after showing success message
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
      {/* Add Bank Button */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddBankClick}
          sx={{
            backgroundColor: '#4CAF50',
            '&:hover': {
              backgroundColor: '#388E3C',
            },
          }}
        >
          Add Bank
        </Button>
      </Box>

      {/* Banks Grid */}
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
                image={bank.imgURL || 'https://via.placeholder.com/150?text=No+Image'}
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

      {/* Add Bank Dialog */}
      <Dialog 
        open={isAddBankOpen} 
        onClose={handleAddBankClose}
        maxWidth="sm"
        fullWidth
      >
        <AddBankForm 
          onClose={handleAddBankClose}
          onSuccess={handleBankAdded}
        />
      </Dialog>
    </Box>
  );
};

export default CustomersDialog;
