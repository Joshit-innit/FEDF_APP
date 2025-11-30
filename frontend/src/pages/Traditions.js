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
import { traditionsAPI } from '../services/api';
import SafeImage from '../components/SafeImage';
import CommentSection from '../components/CommentSection';

const Traditions = () => {
  const { t } = useTranslation();
  const [traditions, setTraditions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [selectedTradition, setSelectedTradition] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchTraditions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchTraditions = async () => {
    try {
      setLoading(true);
      const response = await traditionsAPI.getAll();
      setTraditions(response.data);
    } catch (err) {
      setError(t('common.error'));
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
        {t('traditions.title')}
      </Typography>
      <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 4 }}>
        {t('traditions.subtitle')}
      </Typography>

      {/* Filter */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>{t('traditions.filterByCategory')}</InputLabel>
          <Select
            value={filter}
            label={t('traditions.filterByCategory')}
            onChange={(e) => setFilter(e.target.value)}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category === 'all' ? t('traditions.allCategories') : category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {filteredTraditions.length === 0 ? (
          <Grid item xs={12}>
            <Typography variant="h6" textAlign="center" color="text.secondary">
              {t('traditions.noTraditions')}
            </Typography>
          </Grid>
        ) : (
          filteredTraditions.map((tradition) => (
            <Grid item xs={12} sm={6} md={4} key={tradition._id}>
              <Card
                onClick={() => {
                  setSelectedTradition(tradition);
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
                  src={tradition.images && tradition.images.length > 0 ? tradition.images[0] : null}
                  alt={tradition.title}
                  height="200px"
                  fallbackText={tradition.title}
                />
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

      {/* Tradition Detail Dialog with Comments */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedTradition && (
          <>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>{selectedTradition.title}</span>
              <IconButton
                onClick={() => setOpenDialog(false)}
                size="small"
              >
                <Close />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Box sx={{ mt: 2 }}>
                {selectedTradition.images && selectedTradition.images.length > 0 && (
                  <SafeImage
                    src={selectedTradition.images[0]}
                    alt={selectedTradition.title}
                    height="400px"
                    fallbackText={selectedTradition.title}
                  />
                )}
                <Box sx={{ mt: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    {t('traditions.description')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {selectedTradition.description}
                  </Typography>

                  <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                    {t('common.region')}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {selectedTradition.region}
                  </Typography>

                  {selectedTradition.significance && (
                    <>
                      <Typography variant="h6" gutterBottom>
                        Significance
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 2 }}>
                        {selectedTradition.significance}
                      </Typography>
                    </>
                  )}

                  {selectedTradition.practices && selectedTradition.practices.length > 0 && (
                    <>
                      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Practices
                      </Typography>
                      <ul>
                        {selectedTradition.practices.map((practice, idx) => (
                          <li key={idx}>
                            <Typography variant="body2">{practice}</Typography>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  {/* Comment Section */}
                  <CommentSection
                    itemId={selectedTradition._id}
                    itemType="tradition"
                    itemName={selectedTradition.title}
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

export default Traditions;
