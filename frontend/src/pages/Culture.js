import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Chip,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton
} from '@mui/material';
import { LocationOn, History, Star, Close } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { cultureAPI } from '../services/api';
import SafeImage from '../components/SafeImage';
import CommentSection from '../components/CommentSection';

const Culture = () => {
  const [cultureItems, setCultureItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchCultureItems();
  }, []);

  const fetchCultureItems = async () => {
    try {
      setLoading(true);
      const response = await cultureAPI.getAll();
      setCultureItems(response.data);
    } catch (err) {
      setError('Failed to fetch culture items');
      console.error('Error fetching culture items:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredCultureItems = cultureItems.filter(item =>
    filter === 'all' || item.category === filter
  );

  const categories = ['all', 'Art', 'Music', 'Dance', 'Literature', 'Architecture', 'Philosophy', 'Language'];

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box>
          <CircularProgress size={60} sx={{ color: 'secondary.main' }} />
          <Typography variant="h6" sx={{ mt: 3, color: 'text.secondary' }}>
            Unveiling heritage...
          </Typography>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ borderRadius: 2 }}>{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 6 }} className="fade-in">
      <Box textAlign="center" mb={8}>
        <Typography variant="h6" color="secondary" gutterBottom sx={{ letterSpacing: 3, textTransform: 'uppercase', fontWeight: 700 }}>
          Art & Heritage
        </Typography>
        <Typography variant="h2" component="h1" gutterBottom className="text-gradient" sx={{ background: 'linear-gradient(45deg, #00897B, #004D40)' }}>
          Indian Culture
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto', fontSize: '1.1rem' }}>
          Explore the rich tapestry of Indian arts, music, dance, and architecture that has evolved over millennia.
        </Typography>
      </Box>

      {/* Filter */}
      <Box sx={{ mb: 8, display: 'flex', justifyContent: 'center' }}>
        <FormControl sx={{ minWidth: 250 }} variant="outlined">
          <InputLabel>Filter by Category</InputLabel>
          <Select
            value={filter}
            label="Filter by Category"
            onChange={(e) => setFilter(e.target.value)}
            sx={{
              borderRadius: 3,
              bgcolor: 'white',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
            }}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={4}>
        {filteredCultureItems.length === 0 ? (
          <Grid item xs={12}>
            <Box textAlign="center" py={8} bgcolor="#fff" borderRadius={4} boxShadow={1}>
              <Typography variant="h6" color="text.secondary">
                No culture items found matching your criteria.
              </Typography>
            </Box>
          </Grid>
        ) : (
          filteredCultureItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={item._id} sx={{ display: 'flex' }}>
              <Card
                className="slide-up glass-card"
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  animationDelay: `${index * 0.1}s`,
                  position: 'relative',
                }}
              >
                <Box sx={{ position: 'relative', overflow: 'hidden', borderRadius: '20px 20px 0 0' }}>
                  {item.images && item.images.length > 0 ? (
                    <SafeImage
                      src={item.images[0]}
                      alt={item.title}
                      height="280px"
                      fallbackText={item.title}
                      sx={{
                        transition: 'transform 0.5s ease',
                        '&:hover': {
                          transform: 'scale(1.05)'
                        }
                      }}
                    />
                  ) : (
                    <Box height="280px" bgcolor="#eee" display="flex" alignItems="center" justifyContent="center">
                      <Star sx={{ fontSize: 60, color: '#ccc' }} />
                    </Box>
                  )}
                  <Chip
                    label={item.category}
                    color="secondary"
                    sx={{
                      position: 'absolute',
                      top: 20,
                      right: 20,
                      boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                      fontWeight: 700,
                      backdropFilter: 'blur(4px)',
                    }}
                  />
                </Box>

                <CardContent sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 700, color: '#004D40' }}>
                    {item.title}
                  </Typography>

                  <Box display="flex" alignItems="center" mb={2} color="text.secondary">
                    <LocationOn fontSize="small" sx={{ mr: 0.5, color: 'secondary.main' }} />
                    <Typography variant="body2" fontWeight="600">
                      {item.region}
                    </Typography>
                    {item.historicalPeriod && (
                      <>
                        <Box mx={1}>•</Box>
                        <History fontSize="small" sx={{ mr: 0.5, color: 'secondary.main' }} />
                        <Typography variant="body2" fontWeight="600">
                          {item.historicalPeriod}
                        </Typography>
                      </>
                    )}
                  </Box>

                  <Typography variant="body2" color="text.secondary" paragraph sx={{ mb: 3, flexGrow: 1, lineHeight: 1.6 }}>
                    {item.description}
                  </Typography>

                  <Divider sx={{ mb: 2, opacity: 0.6 }} />

                  {item.significance && (
                    <Box mb={2}>
                      <Typography variant="subtitle2" fontWeight="bold" gutterBottom color="text.primary">
                        Significance
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.significance}
                      </Typography>
                    </Box>
                  )}

                  {item.notableFigures && item.notableFigures.length > 0 && (
                    <Box mt={2}>
                      <Typography variant="subtitle2" fontWeight="bold" gutterBottom color="text.primary">
                        Notable Figures
                      </Typography>
                      <Box display="flex" flexWrap="wrap" gap={0.5}>
                        {item.notableFigures.map((figure, i) => (
                          <Chip
                            key={i}
                            label={figure}
                            size="small"
                            variant="outlined"
                            sx={{ fontSize: '0.75rem', borderColor: 'secondary.light', color: 'secondary.dark' }}
                          />
                        ))}
                      </Box>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default Culture;
