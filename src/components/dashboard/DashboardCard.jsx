import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Box } from '@mui/material';

const DashboardCard = ({ title, value, icon, color, onClick }) => (
  <Card 
    sx={{ 
      height: '100%',
      background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
      borderRadius: '16px',
      transition: 'all 0.3s ease-in-out',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 3px 6px rgba(0,0,0,0.06), 0 3px 6px rgba(0,0,0,0.13)',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 8px 16px rgba(0,0,0,0.12), 0 8px 16px rgba(0,0,0,0.08)',
        '& .icon-wrapper': {
          transform: 'scale(1.1)',
        }
      },
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '4px',
        height: '100%',
        backgroundColor: color,
        opacity: 0.8
      }
    }}
    onClick={onClick}
  >
    <CardContent sx={{ p: 3 }}>
      <Box 
        display="flex" 
        justifyContent="space-between" 
        alignItems="center"
      >
        <Box>
          <Typography 
            variant="body1" 
            component="div" 
            color="text.secondary"
            sx={{ 
              mb: 1,
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              fontSize: '0.875rem'
            }}
          >
            {title}
          </Typography>
          <Typography 
            variant="h4" 
            component="div"
            sx={{ 
              fontWeight: 600,
              color: 'text.primary',
              letterSpacing: '-0.5px'
            }}
          >
            {value}
          </Typography>
        </Box>
        <Box 
          className="icon-wrapper"
          sx={{ 
            opacity: 0.9,
            transition: 'transform 0.3s ease-in-out',
            color: color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: `${color}12`,
            borderRadius: '12px',
            width: 52,
            height: 52,
            p: 1.5,
            backdropFilter: 'blur(8px)',
            border: '1px solid',
            borderColor: `${color}20`
          }}
        >
          {icon}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

DashboardCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  color: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default DashboardCard;
