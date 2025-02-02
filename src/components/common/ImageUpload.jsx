import React, { useState, useRef } from 'react';
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Alert,
  IconButton
} from '@mui/material';
import {
  CloudUpload as UploadIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

const ImageUpload = ({ currentImage, onImageUpload, onImageRemove }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(currentImage || '');
  const fileInputRef = useRef(null);

  const validateFile = (file) => {
    // Check file size (max 2MB)
    if (file.size > 2000000) {
      throw new Error('File is too large. Maximum size is 2MB');
    }

    // Check file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Only JPG, PNG & GIF files are allowed');
    }
  };

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setError('');
      setLoading(true);

      // Validate file
      validateFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);

      // Create form data
      const formData = new FormData();
      formData.append('logo', file);

      // Upload file
      const response = await fetch('http://localhost/inventoryproj/server/api/banks/upload_logo.php', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (response.ok) {
        onImageUpload(data.url);
      } else {
        throw new Error(data.message || 'Failed to upload image');
      }
    } catch (err) {
      setError(err.message);
      setPreview(currentImage || '');
    } finally {
      setLoading(false);
      // Clear file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveImage = () => {
    setPreview('');
    onImageRemove();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Box sx={{ width: '100%', textAlign: 'center' }}>
      {/* Preview Area */}
      {preview ? (
        <Box sx={{ position: 'relative', display: 'inline-block', mb: 2 }}>
          <Box
            component="img"
            src={preview}
            alt="Preview"
            sx={{
              maxWidth: '200px',
              maxHeight: '200px',
              objectFit: 'contain',
              borderRadius: 1,
              border: '1px solid #eee',
              bgcolor: 'white',
              p: 1
            }}
          />
          <IconButton
            onClick={handleRemoveImage}
            sx={{
              position: 'absolute',
              top: -8,
              right: -8,
              bgcolor: 'error.main',
              color: 'white',
              '&:hover': {
                bgcolor: 'error.dark',
              },
              width: 30,
              height: 30
            }}
          >
            <DeleteIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>
      ) : null}

      {/* Upload Button */}
      <Button
        component="label"
        variant="outlined"
        startIcon={loading ? <CircularProgress size={20} /> : <UploadIcon />}
        disabled={loading}
        sx={{ mb: error ? 2 : 0 }}
      >
        {loading ? 'Uploading...' : 'Upload Bank Logo'}
        <input
          ref={fileInputRef}
          type="file"
          hidden
          accept="image/png, image/jpeg, image/gif"
          onChange={handleFileSelect}
        />
      </Button>

      {/* Helper Text */}
      <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 1 }}>
        Maximum file size: 2MB. Supported formats: JPG, PNG, GIF
      </Typography>

      {/* Error Message */}
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default ImageUpload;
