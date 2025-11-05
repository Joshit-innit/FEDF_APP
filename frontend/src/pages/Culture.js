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
} from '@mui/material';
import { cultureAPI } from '../services/api';

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
      <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading culture items...
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
        Indian Culture & Arts
      </Typography>
      <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 4 }}>
        Explore the rich artistic and cultural heritage of India
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
        {filteredCultureItems.length === 0 ? (
          <Grid item xs={12}>
            <Typography variant="h6" textAlign="center" color="text.secondary">
              No culture items found. Add some sample data to see culture items here!
            </Typography>
          </Grid>
        ) : (
          filteredCultureItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item._id}>
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
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {item.description}
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Chip
                      label={item.category}
                      color="primary"
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    <Chip
                      label={item.region}
                      color="secondary"
                      size="small"
                    />
                  </Box>
                  {item.historicalPeriod && (
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Period:</strong> {item.historicalPeriod}
                    </Typography>
                  )}
                  {item.significance && (
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Significance:</strong> {item.significance}
                    </Typography>
                  )}
                  {item.notableFigures && item.notableFigures.length > 0 && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2" fontWeight="bold">
                        Notable Figures:
                      </Typography>
                      {item.notableFigures.map((figure, index) => (
                        <Chip
                          key={index}
                          label={figure}
                          size="small"
                          sx={{ mr: 0.5, mb: 0.5 }}
                        />
                      ))}
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
