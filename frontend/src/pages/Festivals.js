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
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { festivalsAPI } from '../services/api';
import SafeImage from '../components/SafeImage';
import CommentSection from '../components/CommentSection';

const Festivals = () => {
  const { t } = useTranslation();
  const [festivals, setFestivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [selectedFestival, setSelectedFestival] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchFestivals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchFestivals = async () => {
    try {
      setLoading(true);
      const response = await festivalsAPI.getAll();
      setFestivals(response.data);
    } catch (err) {
      setError(t('common.error'));
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
          {t('festivals.loading')}
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
        {t('festivals.title')}
      </Typography>
      <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 4 }}>
        {t('festivals.subtitle')}
      </Typography>

      {/* Filter */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>{t('festivals.filterByCategory')}</InputLabel>
          <Select
            value={filter}
            label={t('festivals.filterByCategory')}
            onChange={(e) => setFilter(e.target.value)}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category === 'all' ? t('festivals.allCategories') : category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {filteredFestivals.length === 0 ? (
          <Grid item xs={12}>
            <Typography variant="h6" textAlign="center" color="text.secondary">
              {t('festivals.noFestivals')}
            </Typography>
          </Grid>
        ) : (
          filteredFestivals.map((festival) => (
            <Grid item xs={12} sm={6} md={4} key={festival._id}>
              <Card
                onClick={() => {
                  setSelectedFestival(festival);
                  setOpenDialog(true);
                }}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 3,
                  },
                }}
              >
                <SafeImage
                  src={festival.images && festival.images.length > 0 ? festival.images[0] : null}
                  alt={festival.name}
                  height="200px"
                  fallbackText={festival.name}
                />
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
                    {t('festivals.date')}: {festival.date}
                  </Typography>
                  {festival.significance && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      <strong>{t('festivals.significance')}:</strong> {festival.significance}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* Festival Detail Dialog with Comments */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedFestival && (
          <>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>{selectedFestival.name}</span>
              <IconButton
                onClick={() => setOpenDialog(false)}
                size="small"
              >
                <Close />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Box sx={{ mt: 2 }}>
                {selectedFestival.images && selectedFestival.images.length > 0 && (
                  <SafeImage
                    src={selectedFestival.images[0]}
                    alt={selectedFestival.name}
                    height="400px"
                    fallbackText={selectedFestival.name}
                  />
                )}
                <Box sx={{ mt: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    {t('festivals.description')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {selectedFestival.description}
                  </Typography>

                  <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                    {t('common.region')}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {selectedFestival.region}
                  </Typography>

                  <Typography variant="h6" gutterBottom>
                    {t('festivals.date')}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {selectedFestival.date}
                  </Typography>

                  {selectedFestival.significance && (
                    <>
                      <Typography variant="h6" gutterBottom>
                        {t('festivals.significance')}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 2 }}>
                        {selectedFestival.significance}
                      </Typography>
                    </>
                  )}

                  {selectedFestival.traditions && selectedFestival.traditions.length > 0 && (
                    <>
                      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Traditions
                      </Typography>
                      <ul>
                        {selectedFestival.traditions.map((tradition, idx) => (
                          <li key={idx}>
                            <Typography variant="body2">{tradition}</Typography>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  {selectedFestival.foods && selectedFestival.foods.length > 0 && (
                    <>
                      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Traditional Foods
                      </Typography>
                      <ul>
                        {selectedFestival.foods.map((food, idx) => (
                          <li key={idx}>
                            <Typography variant="body2">{food}</Typography>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  {/* Comment Section */}
                  <CommentSection
                    itemId={selectedFestival._id}
                    itemType="festival"
                    itemName={selectedFestival.name}
                  />
                </Box>
              </Box>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default Festivals;
