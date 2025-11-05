import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Box } from '@mui/material';
import { Festival, Restaurant, Psychology, AutoStories } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Festivals',
      description: 'Explore the vibrant festivals of India, from Diwali to Holi, understanding their significance and traditions.',
      icon: <Festival sx={{ fontSize: 60, color: '#FF6B35' }} />,
      path: '/festivals',
      color: '#FF6B35',
      image: 'https://images.unsplash.com/photo-1617038220319-276d7f70d7b3?w=800&h=500&fit=crop',
    },
    {
      title: 'Traditions',
      description: 'Discover ancient Indian traditions, rituals, and customs that have been passed down through generations.',
      icon: <Psychology sx={{ fontSize: 60, color: '#4CAF50' }} />,
      path: '/traditions',
      color: '#4CAF50',
      image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&h=500&fit=crop',
    },
    {
      title: 'Recipes',
      description: 'Learn authentic Indian recipes from different regions, from street food to royal cuisine.',
      icon: <Restaurant sx={{ fontSize: 60, color: '#FF9800' }} />,
      path: '/recipes',
      color: '#FF9800',
      image: 'https://images.unsplash.com/photo-1563379091339-03246963d4d0?w=800&h=500&fit=crop',
    },
    {
      title: 'Culture',
      description: 'Immerse yourself in Indian art, music, dance, literature, and architectural marvels.',
      icon: <AutoStories sx={{ fontSize: 60, color: '#9C27B0' }} />,
      path: '/culture',
      color: '#9C27B0',
      image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=500&fit=crop',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, rgba(255,107,53,0.9) 0%, rgba(191,54,12,0.9) 100%), url(https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1920&h=1080&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
          color: 'white',
          py: 8,
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h1" component="h1" gutterBottom>
            भारतीय सांस्कृतिक केंद्र
          </Typography>
          <Typography variant="h3" component="h2" gutterBottom sx={{ color: 'rgba(255,255,255,0.95)' }}>
            Indian Culture Hub
          </Typography>
          <Typography variant="h5" component="p" sx={{ mb: 4, opacity: 0.9 }}>
            Discover the rich tapestry of Indian culture, traditions, festivals, and cuisine
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: 600, mx: 'auto', opacity: 0.8 }}>
            From the snow-capped Himalayas to the tropical beaches of Kerala, India's diverse culture 
            offers endless stories, flavors, and traditions waiting to be explored.
          </Typography>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h2" component="h2" textAlign="center" gutterBottom>
          Explore Indian Culture | भारतीय संस्कृति में डूबें
        </Typography>
        <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 6 }}>
          Choose a category to begin your journey
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 20px rgba(0,0,0,0.15)',
                  },
                }}
                onClick={() => navigate(feature.path)}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={feature.image}
                  alt={feature.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ textAlign: 'center', p: 3, flexGrow: 1 }}>
                  <Box sx={{ mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h5" component="h3" gutterBottom color={feature.color}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Stats Section */}
      <Box
        sx={{
          backgroundColor: '#FFF8E1',
          py: 6,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} textAlign="center">
            <Grid item xs={12} sm={3}>
              <Typography variant="h3" color="primary" fontWeight="bold">
                100+
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Festivals
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant="h3" color="primary" fontWeight="bold">
                50+
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Traditions
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant="h3" color="primary" fontWeight="bold">
                200+
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Recipes
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant="h3" color="primary" fontWeight="bold">
                75+
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Cultural Artifacts
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default Home;
