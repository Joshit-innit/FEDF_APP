import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { Festival, Restaurant, Psychology, AutoStories } from '@mui/icons-material';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/', icon: <AutoStories /> },
    { label: 'Festivals', path: '/festivals', icon: <Festival /> },
    { label: 'Traditions', path: '/traditions', icon: <Psychology /> },
    { label: 'Recipes', path: '/recipes', icon: <Restaurant /> },
    { label: 'Culture', path: '/culture', icon: <AutoStories /> },
    { label: 'Login', path: '/login', icon: <AutoStories /> },
  ];

  return (
    <AppBar position="sticky">
      <Toolbar sx={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=40)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backdropFilter: 'blur(2px)'
      }}>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.5rem',
          }}
        >
          🇮🇳 भारतीय सांस्कृतिक केंद्र | Indian Culture Hub
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {navItems.map((item) => (
            <Button
              key={item.path}
              component={Link}
              to={item.path}
              startIcon={item.icon}
              sx={{
                color: 'white',
                backgroundColor: location.pathname === item.path ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
