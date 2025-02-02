import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  IconButton,
  Paper,
  CircularProgress
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

const BankDetails = () => {
  const { bankId } = useParams();
  const navigate = useNavigate();
  const [bank, setBank] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBankDetails = async () => {
      try {
        // Use the specific endpoint for getting a single bank
        const response = await fetch(`http://localhost/inventoryproj/server/api/banks/get_bank.php?id=${bankId}`);
        const data = await response.json();
        
        if (response.ok) {
          console.log('Bank details:', data);
          setBank(data);
        } else {
          console.log('Error response:', data);
          setError(data.message || 'Failed to load bank details');
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Error loading bank details');
      } finally {
        setLoading(false);
      }
    };

    if (bankId) {
      fetchBankDetails();
    }
  }, [bankId]);

  const handleBack = () => {
    // Navigate back to dashboard with state to show cards dialog
    navigate('/', { 
      state: { showCardsDialog: true }
    });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh',
      bgcolor: '#f5f5f5',
      pt: 3,
      pb: 6
    }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
          <IconButton 
            onClick={handleBack}
            sx={{ mr: 2 }}
            aria-label="back"
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h5" component="h1">
            Bank Details
          </Typography>
        </Box>

        <Paper 
          elevation={0} 
          sx={{ 
            p: 4,
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            mb: 4,
            borderRadius: 2
          }}
        >
          <Box
            component="img"
            src={bank?.imgURL}
            alt={bank?.name}
            sx={{
              width: 200,
              height: 'auto',
              objectFit: 'contain',
              p: 2,
              bgcolor: 'white',
              borderRadius: 1,
              border: '1px solid #eee'
            }}
          />
          <Box>
            <Typography variant="h4" component="h2" gutterBottom>
              {bank?.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {bank?.totalCardType} card types available
            </Typography>
          </Box>
        </Paper>

        {/* Placeholder for future card types list */}
        <Paper 
          elevation={0} 
          sx={{ 
            p: 4,
            borderRadius: 2,
            bgcolor: 'white',
            minHeight: 400,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Typography color="text.secondary">
            Card types list will be added soon
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default BankDetails;
