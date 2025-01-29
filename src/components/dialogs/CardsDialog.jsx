import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  CircularProgress
} from '@mui/material';

const CardsDialog = () => {
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
    <Box sx={{ minHeight: 400, p: 2 }}>
      <List sx={{ width: '100%' }}>
        {banks.map((bank, index) => (
          <React.Fragment key={bank.id}>
            <ListItem 
              sx={{ 
                py: 2,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                }
              }}
            >
              <ListItemAvatar>
                <Avatar 
                  src={bank.imgURL} 
                  alt={bank.name}
                  variant="rounded"
                  sx={{ 
                    width: 56, 
                    height: 56,
                    mr: 2,
                    bgcolor: 'white',
                    border: '1px solid #eee'
                  }}
                >
                  {bank.name.charAt(0)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="body1" sx={{ fontWeight: 500, ml: 1 }}>
                    {bank.name}
                  </Typography>
                }
                secondary={
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    {bank.totalCardType} card types
                  </Typography>
                }
              />
            </ListItem>
            {index < banks.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default CardsDialog;
