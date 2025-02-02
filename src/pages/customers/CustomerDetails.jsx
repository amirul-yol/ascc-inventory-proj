import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  IconButton,
  Paper,
  CircularProgress,
  Button,
  Dialog
} from '@mui/material';
import { 
  ArrowBack, 
  Edit as EditIcon
} from '@mui/icons-material';
import EditBankForm from '../../components/forms/EditBankForm';

const CustomerDetails = () => {
  const { bankId } = useParams();
  const navigate = useNavigate();
  const [bank, setBank] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const fetchBankDetails = async () => {
    try {
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

  useEffect(() => {
    if (bankId) {
      fetchBankDetails();
    }
  }, [bankId]);

  const handleBack = () => {
    navigate('/', { 
      state: { showCustomersDialog: true }
    });
  };

  const handleEditClick = () => {
    setIsEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setIsEditDialogOpen(false);
  };

  const handleEditSuccess = (updatedBank) => {
    setBank(prevBank => ({
      ...prevBank,
      ...updatedBank
    }));
    setTimeout(() => {
      setIsEditDialogOpen(false);
    }, 1500); // Close dialog after success message is shown
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
            Bank Customers
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
            borderRadius: 2,
            position: 'relative'
          }}
        >
          {/* Edit Button */}
          <IconButton
            onClick={handleEditClick}
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              bgcolor: 'primary.main',
              color: 'white',
              '&:hover': {
                bgcolor: 'primary.dark',
              },
            }}
          >
            <EditIcon />
          </IconButton>

          <Box
            component="img"
            src={bank?.imgURL || 'https://via.placeholder.com/150?text=No+Image'}
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
              Customers Overview
            </Typography>
          </Box>
        </Paper>

        {/* Placeholder for future customers list */}
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
            Customers list will be added soon
          </Typography>
        </Paper>

        {/* Edit Bank Dialog */}
        <Dialog
          open={isEditDialogOpen}
          onClose={handleEditClose}
          maxWidth="sm"
          fullWidth
        >
          {bank && (
            <EditBankForm
              bank={bank}
              onClose={handleEditClose}
              onSuccess={handleEditSuccess}
            />
          )}
        </Dialog>
      </Container>
    </Box>
  );
};

export default CustomerDetails;
