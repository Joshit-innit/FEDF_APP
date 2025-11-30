import React from 'react';
import { Container, Typography, Grid, Card, CardContent, Box, Button } from '@mui/material';
import { Festival, Restaurant, Psychology, AutoStories, ArrowForward } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SafeImage from '../components/SafeImage';

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const features = [
    {
      title: t('home.sections.festivals.title'),
      description: t('home.sections.festivals.description'),
      icon: <Festival sx={{ fontSize: 40, color: '#FF6B35' }} />,
      path: '/festivals',
      color: '#FF6B35',
      image: 'https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcSWBBc3iNbq261uSvxxEzAODz-vf_zvC04VHzBlkGE6pC9d8dMtod9zf3ZhyYKrIAqBwrk6kFXgvyTnoDjaNs3Wom1h-OjtF0Ve2Yo5x5YPnjGyVpY',
    },
    {
      title: t('home.sections.traditions.title'),
      description: t('home.sections.traditions.description'),
      icon: <Psychology sx={{ fontSize: 40, color: '#00897B' }} />,
      path: '/traditions',
      color: '#00897B',
      image: 'https://www.udanceacademy.net/wp-content/uploads/2017/11/Kathak-Dance-Uzzal-Dance-Academy.jpg',
    },
    {
      title: t('home.sections.recipes.title'),
      description: t('home.sections.recipes.description'),
      icon: <Restaurant sx={{ fontSize: 40, color: '#D84315' }} />,
      path: '/recipes',
      color: '#D84315',
      image: 'https://mykitchendiaries.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2025/08/How-To-Make-Soft-And-Spongy-Davangere-Benne-Dosa-.png.webp',
    },
    {
      title: t('home.sections.culture.title'),
      description: t('home.sections.culture.description'),
      icon: <AutoStories sx={{ fontSize: 40, color: '#1976D2' }} />,
      path: '/culture',
      color: '#1976D2',
      image: 'https://c9admin.cottage9.com/uploads/5612/mahakumbh-2025.jpg',
    },
  ];

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url(https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          color: 'white',
          minHeight: '90vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          position: 'relative',
          clipPath: 'polygon(0 0, 100% 0, 100% 90%, 50% 100%, 0 90%)',
          mb: 10,
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h1"
            component="h1"
            gutterBottom
            sx={{
              color: '#fff',
              textShadow: '0 4px 20px rgba(0,0,0,0.5)',
              fontSize: { xs: '3.5rem', md: '6rem' },
              fontWeight: 800,
              mb: 2
            }}
          >
            {t('home.title')}
          </Typography>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{
              color: '#FF9E75',
              fontFamily: '"Poppins", sans-serif',
              fontWeight: 400,
              mb: 5,
              textShadow: '0 2px 10px rgba(0,0,0,0.5)',
              letterSpacing: 1
            }}
          >
            {t('home.subtitle')}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              maxWidth: 750,
              mx: 'auto',
              mb: 6,
              opacity: 0.95,
              fontWeight: 300,
              lineHeight: 1.8,
              fontSize: '1.2rem'
            }}
          >
            Embark on a journey through 5000 years of history, culture, and tradition.
            From the Himalayas to the Indian Ocean, experience the unity in diversity.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            endIcon={<ArrowForward />}
            onClick={() => document.getElementById('explore').scrollIntoView({ behavior: 'smooth' })}
            sx={{
              fontSize: '1.2rem',
              px: 5,
              py: 1.8,
              borderRadius: 50,
              background: 'rgba(255, 107, 53, 0.9)',
              backdropFilter: 'blur(5px)',
              border: '1px solid rgba(255,255,255,0.2)'
            }}
          >
            Start Exploring
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="xl" id="explore" sx={{ py: 4, mb: 12 }}>
        <Box textAlign="center" mb={10}>
          <Typography variant="h6" color="primary" gutterBottom sx={{ letterSpacing: 3, textTransform: 'uppercase', fontWeight: 700 }}>
            Welcome to FEDF
          </Typography>
          <Typography variant="h2" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
            Explore Our Heritage
          </Typography>
          <Box
            sx={{
              width: 100,
              height: 6,
              background: 'linear-gradient(90deg, #FF6B35, #D84315)',
              mx: 'auto',
              borderRadius: 3,
              mt: 3
            }}
          />
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index} sx={{ display: 'flex' }}>
              <Card
                className="slide-up glass-card"
                sx={{
                  width: '100%',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  animationDelay: `${index * 0.1}s`,
                  position: 'relative',
                  overflow: 'visible',
                  '&:hover .icon-box': {
                    transform: 'translateY(-15px) scale(1.1)',
                    boxShadow: '0 15px 30px rgba(0,0,0,0.2)',
                  },
                  '&:hover .card-media': {
                    transform: 'scale(1.05)',
                  }
                }}
                onClick={() => navigate(feature.path)}
              >
                <Box sx={{ overflow: 'hidden', borderRadius: '20px 20px 0 0' }}>
                  <SafeImage
                    src={feature.image}
                    alt={feature.title}
                    height="250px"
                    fallbackText={feature.title}
                    sx={{
                      transition: 'transform 0.6s ease',
                      '&:hover': {
                        transform: 'scale(1.05)'
                      }
                    }}
                  />
                </Box>
                <Box
                  className="icon-box"
                  sx={{
                    position: 'absolute',
                    top: 210,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    bgcolor: 'white',
                    p: 2,
                    borderRadius: '50%',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 90,
                    height: 90,
                    zIndex: 2,
                  }}
                >
                  {feature.icon}
                </Box>
                <CardContent sx={{ pt: 8, textAlign: 'center', flexGrow: 1, px: 4, pb: 5 }}>
                  <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 700, color: '#2C1810' }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, fontSize: '0.95rem' }}>
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Stats/Quote Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #FFF8E1 0%, #FFECB3 100%)',
          py: 12,
          position: 'relative',
          overflow: 'hidden',
          clipPath: 'polygon(0 15%, 100% 0, 100% 100%, 0 100%)',
          mt: 8
        }}
      >
        {/* Decorative background elements */}
        <Box
          sx={{
            position: 'absolute',
            top: -50,
            left: -50,
            width: 300,
            height: 300,
            borderRadius: '50%',
            bgcolor: 'rgba(255, 107, 53, 0.08)'
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -50,
            right: -50,
            width: 400,
            height: 400,
            borderRadius: '50%',
            bgcolor: 'rgba(0, 137, 123, 0.08)'
          }}
        />

        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <Typography variant="h3" component="div" gutterBottom sx={{ fontStyle: 'italic', color: '#4E342E', fontWeight: 600, lineHeight: 1.4 }}>
            "India is the cradle of the human race, the birthplace of human speech, the mother of history, the grandmother of legend, and the great-grandmother of tradition."
          </Typography>
          <Typography variant="h6" sx={{ mt: 4, color: 'primary.main', fontWeight: 700, letterSpacing: 1 }}>
            — MARK TWAIN
          </Typography>
        </Container>
      </Box>
    </div>
  );
};

export default Home;
