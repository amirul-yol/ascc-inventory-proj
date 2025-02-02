import React, { useState, useEffect } from 'react';
import { Typography, Grid, Box, Container } from '@mui/material';
import { PeopleAlt, CreditCard, Description, Business } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import DashboardCard from '../../components/dashboard/DashboardCard';
import CustomDialog from '../../components/common/CustomDialog';
import CardsDialog from '../../components/dialogs/CardsDialog';
import ReportsDialog from '../../components/dialogs/ReportsDialog';
import CustomersDialog from '../../components/dialogs/CustomersDialog';

const DASHBOARD_CARDS = [
  {
    title: 'Cards',
    icon: <CreditCard sx={{ fontSize: 28 }} />,
    color: '#2196F3',
    type: 'cards'
  },
  {
    title: 'Reports',
    icon: <Description sx={{ fontSize: 28 }} />,
    color: '#4CAF50',
    type: 'reports'
  },
  {
    title: 'Customers',
    icon: <Business sx={{ fontSize: 28 }} />,
    color: '#FF9800',
    type: 'customers'
  },
  {
    title: 'Users',
    value: '45',
    icon: <PeopleAlt sx={{ fontSize: 28 }} />,
    color: '#9C27B0',
    type: 'users'
  }
];

const AdminDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState(null);
  const [totalCardTypes, setTotalCardTypes] = useState(0);
  const [totalBanks, setTotalBanks] = useState(0);

  useEffect(() => {
    if (location.state?.showCardsDialog) {
      setSelectedCard(DASHBOARD_CARDS.find(card => card.type === 'cards'));
    } else if (location.state?.showReportsDialog) {
      setSelectedCard(DASHBOARD_CARDS.find(card => card.type === 'reports'));
    } else if (location.state?.showCustomersDialog) {
      setSelectedCard(DASHBOARD_CARDS.find(card => card.type === 'customers'));
    }
  }, [location.state]);

  useEffect(() => {
    const fetchTotalCardTypes = async () => {
      try {
        const response = await fetch('http://localhost/inventoryproj/server/api/banks/get_total_cards.php');
        const data = await response.json();
        setTotalCardTypes(data.total);
      } catch (error) {
        console.error('Error fetching total card types:', error);
      }
    };

    const fetchTotalBanks = async () => {
      try {
        const response = await fetch('http://localhost/inventoryproj/server/api/banks/get_total_banks.php');
        const data = await response.json();
        setTotalBanks(data.total);
      } catch (error) {
        console.error('Error fetching total banks:', error);
      }
    };

    fetchTotalCardTypes();
    fetchTotalBanks();
  }, []);

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleCloseDialog = () => {
    setSelectedCard(null);
    if (location.state?.showCardsDialog || location.state?.showReportsDialog || location.state?.showCustomersDialog) {
      navigate('/', { replace: true });
    }
  };

  const renderDialogContent = () => {
    if (!selectedCard) return null;

    switch (selectedCard.type) {
      case 'cards':
        return <CardsDialog onClose={handleCloseDialog} />;
      case 'reports':
        return <ReportsDialog onClose={handleCloseDialog} />;
      case 'customers':
        return <CustomersDialog onClose={handleCloseDialog} />;
      default:
        return (
          <Box sx={{ minHeight: 300, p: 2 }}>
            <Typography>
              {selectedCard.title} content will be added here
            </Typography>
          </Box>
        );
    }
  };

  const dashboardCardsWithCounts = DASHBOARD_CARDS.map(card => {
    if (card.type === 'cards') {
      return { ...card, value: totalCardTypes.toString() };
    }
    if (card.type === 'customers') {
      return { ...card, value: totalBanks.toString() };
    }
    return card;
  });

  return (
    <Box 
      component="main"
      sx={{ 
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0,
        background: 'linear-gradient(145deg, #e6e9ef 0%, #eef1f5 100%)',
      }}
    >
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 3,
        }}
      >
        <Container maxWidth="md">
          <Grid 
            container 
            spacing={3} 
            sx={{ 
              maxWidth: 800,
              margin: '0 auto',
              px: { xs: 2, sm: 3 }
            }}
          >
            {dashboardCardsWithCounts.map((card, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <DashboardCard 
                  {...card} 
                  onClick={() => handleCardClick(card)}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <CustomDialog
        open={Boolean(selectedCard)}
        onClose={handleCloseDialog}
        title={selectedCard?.title || ''}
      >
        {renderDialogContent()}
      </CustomDialog>
    </Box>
  );
};

export default AdminDashboard;
