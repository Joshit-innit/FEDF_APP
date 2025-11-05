import React from 'react';
import { Box, Container, Typography, Link as MuiLink } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ mt: 6 }}>
      <div className="tricolor-bar" />
      <Box sx={{ py: 4, backgroundColor: '#FFF4E6' }}>
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ color: '#8C2F00', fontWeight: 700 }}>
            Indian Culture Hub
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Celebrating the diversity of India — arts, food, festivals, and traditions.
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', gap: 2, justifyContent: 'center' }}>
            <MuiLink href="#" underline="hover" sx={{ color: '#A63F03' }}>About</MuiLink>
            <MuiLink href="#" underline="hover" sx={{ color: '#A63F03' }}>Contact</MuiLink>
            <MuiLink href="#" underline="hover" sx={{ color: '#A63F03' }}>Contribute</MuiLink>
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
            © {new Date().getFullYear()} Indian Culture Hub. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;




