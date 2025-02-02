import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Paper,
  IconButton,
  Divider
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import ImageUpload from '../common/ImageUpload';

const AddBankForm = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    imgURL: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (url) => {
    setFormData(prev => ({
      ...prev,
      imgURL: url
    }));
  };

  const handleImageRemove = () => {
    setFormData(prev => ({
      ...prev,
      imgURL: ''
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!formData.name.trim()) {
      setError('Bank name is required');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost/inventoryproj/server/api/banks/create.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Bank added successfully!');
        setFormData({ name: '', imgURL: '' });
        if (onSuccess) {
          onSuccess();
        }
      } else {
        setError(data.message || 'Failed to add bank');
      }
    } catch (err) {
      setError('Error adding bank. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper 
      elevation={0}
      sx={{ 
        p: 3,
        position: 'relative',
        maxWidth: 500,
        mx: 'auto'
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8
        }}
      >
        <CloseIcon />
      </IconButton>

      <Typography variant="h6" component="h2" gutterBottom>
        Add New Bank
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Bank Name"
          name="name"
          autoFocus
          value={formData.name}
          onChange={handleChange}
          disabled={loading}
        />

        <Divider sx={{ my: 3 }} />

        <ImageUpload
          currentImage={formData.imgURL}
          onImageUpload={handleImageUpload}
          onImageRemove={handleImageRemove}
        />

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mt: 2 }}>
            {success}
          </Alert>
        )}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Bank'}
        </Button>
      </Box>
    </Paper>
  );
};

export default AddBankForm;
