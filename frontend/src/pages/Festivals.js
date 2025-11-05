import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Chip,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { festivalsAPI } from '../services/api';

const Festivals = () => {
  const [festivals, setFestivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchFestivals();
  }, []);

  const fetchFestivals = async () => {
    try {
      setLoading(true);
      const response = await festivalsAPI.getAll();
      setFestivals(response.data);
    } catch (err) {
      setError('Failed to fetch festivals');
      console.error('Error fetching festivals:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredFestivals = festivals.filter(festival => 
    filter === 'all' || festival.category === filter
  );

  const categories = ['all', 'Religious', 'Harvest', 'Seasonal', 'Cultural', 'National'];

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading festivals...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h2" component="h1" gutterBottom textAlign="center">
        Indian Festivals
      </Typography>
      <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 4 }}>
        Discover the vibrant celebrations that define Indian culture
      </Typography>

      {/* Filter */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Filter by Category</InputLabel>
          <Select
            value={filter}
            label="Filter by Category"
            onChange={(e) => setFilter(e.target.value)}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {filteredFestivals.length === 0 ? (
          <Grid item xs={12}>
            <Typography variant="h6" textAlign="center" color="text.secondary">
              No festivals found. Add some sample data to see festivals here!
            </Typography>
          </Grid>
        ) : (
          filteredFestivals.map((festival) => (
            <Grid item xs={12} sm={6} md={4} key={festival._id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                {festival.images && festival.images.length > 0 && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={festival.images[0]}
                    alt={festival.name}
                    sx={{ objectFit: 'cover' }}
                  />
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {festival.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {festival.description}
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Chip
                      label={festival.category}
                      color="primary"
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    <Chip
                      label={festival.region}
                      color="secondary"
                      size="small"
                    />
                  </Box>
                  <Typography variant="body2" fontWeight="bold" color="primary">
                    Date: {festival.date}
                  </Typography>
                  {festival.significance && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      <strong>Significance:</strong> {festival.significance}
                    </Typography>
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

export default Festivals;
