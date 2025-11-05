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
import { traditionsAPI } from '../services/api';

const Traditions = () => {
  const [traditions, setTraditions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchTraditions();
  }, []);

  const fetchTraditions = async () => {
    try {
      setLoading(true);
      const response = await traditionsAPI.getAll();
      setTraditions(response.data);
    } catch (err) {
      setError('Failed to fetch traditions');
      console.error('Error fetching traditions:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredTraditions = traditions.filter(tradition => 
    filter === 'all' || tradition.category === filter
  );

  const categories = ['all', 'Wedding', 'Birth', 'Death', 'Religious', 'Social', 'Artistic'];

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading traditions...
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
        Indian Traditions
      </Typography>
      <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 4 }}>
        Explore the ancient customs and rituals that shape Indian society
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
        {filteredTraditions.length === 0 ? (
          <Grid item xs={12}>
            <Typography variant="h6" textAlign="center" color="text.secondary">
              No traditions found. Add some sample data to see traditions here!
            </Typography>
          </Grid>
        ) : (
          filteredTraditions.map((tradition) => (
            <Grid item xs={12} sm={6} md={4} key={tradition._id}>
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
                    {tradition.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {tradition.description}
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Chip
                      label={tradition.category}
                      color="primary"
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    <Chip
                      label={tradition.region}
                      color="secondary"
                      size="small"
                    />
                  </Box>
                  {tradition.significance && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      <strong>Significance:</strong> {tradition.significance}
                    </Typography>
                  )}
                  {tradition.practices && tradition.practices.length > 0 && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2" fontWeight="bold">
                        Practices:
                      </Typography>
                      {tradition.practices.map((practice, index) => (
                        <Chip
                          key={index}
                          label={practice}
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

export default Traditions;
