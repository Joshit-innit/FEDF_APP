import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Select, MenuItem } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const navItems = [
    { label: t('nav.home'), path: '/' },
    { label: t('nav.festivals'), path: '/festivals' },
    { label: t('nav.traditions'), path: '/traditions' },
    { label: t('nav.recipes'), path: '/recipes' },
    { label: t('nav.culture'), path: '/culture' },
    { label: t('nav.login'), path: '/login' },
  ];

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

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
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          {navItems.map((item) => (
            <Button
              key={item.path}
              component={Link}
              to={item.path}
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
          <Select
            value={i18n.language}
            onChange={handleLanguageChange}
            sx={{
              color: 'white',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: 1,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
              },
              '& .MuiSvgIcon-root': {
                color: 'white',
              },
            }}
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="hi">हिन्दी (Hindi)</MenuItem>
            <MenuItem value="es">Español (Spanish)</MenuItem>
            <MenuItem value="ta">தமிழ் (Tamil)</MenuItem>
            <MenuItem value="ml">മലയാളം (Malayalam)</MenuItem>
            <MenuItem value="kn">ಕನ್ನಡ (Kannada)</MenuItem>
          </Select>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
