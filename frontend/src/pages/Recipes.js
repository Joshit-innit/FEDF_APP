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
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import { AccessTime, RestaurantMenu, PersonOutline, LocalFireDepartment, Close } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { recipesAPI } from '../services/api';
import SafeImage from '../components/SafeImage';
import CommentSection from '../components/CommentSection';

const Recipes = () => {
  const { t } = useTranslation();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const response = await recipesAPI.getAll();
      setRecipes(response.data);
    } catch (err) {
      setError(t('common.error'));
      console.error('Error fetching recipes:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredRecipes = recipes.filter(recipe =>
    filter === 'all' || recipe.difficulty === filter
  );

  const difficulties = ['all', 'Easy', 'Medium', 'Hard'];

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box>
          <CircularProgress size={60} sx={{ color: 'primary.main' }} />
          <Typography variant="h6" sx={{ mt: 3, color: 'text.secondary' }}>
            Preparing the kitchen...
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
        <Typography variant="h6" color="primary" gutterBottom sx={{ letterSpacing: 3, textTransform: 'uppercase', fontWeight: 700 }}>
          Culinary Delights
        </Typography>
        <Typography variant="h2" component="h1" gutterBottom className="text-gradient">
          Authentic Indian Recipes
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto', fontSize: '1.1rem' }}>
          Discover the secrets of Indian spices and flavors. From royal biryanis to humble street food, explore a world of taste.
        </Typography>
      </Box>

      {/* Filter */}
      <Box sx={{ mb: 8, display: 'flex', justifyContent: 'center' }}>
        <FormControl sx={{ minWidth: 250 }} variant="outlined">
          <InputLabel>Filter by Difficulty</InputLabel>
          <Select
            value={filter}
            label="Filter by Difficulty"
            onChange={(e) => setFilter(e.target.value)}
            sx={{
              borderRadius: 3,
              bgcolor: 'white',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
            }}
          >
            {difficulties.map((difficulty) => (
              <MenuItem key={difficulty} value={difficulty}>
                {difficulty === 'all' ? 'All Difficulties' : difficulty}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={4}>
        {filteredRecipes.length === 0 ? (
          <Grid item xs={12}>
            <Box textAlign="center" py={8} bgcolor="#fff" borderRadius={4} boxShadow={1}>
              <Typography variant="h6" color="text.secondary">
                No recipes found matching your criteria.
              </Typography>
            </Box>
          </Grid>
        ) : (
          filteredRecipes.map((recipe, index) => (
            <Grid item xs={12} sm={6} md={4} key={recipe._id} sx={{ display: 'flex' }}>
              <Card
                onClick={() => {
                  setSelectedRecipe(recipe);
                  setOpenDialog(true);
                }}
                className="slide-up glass-card"
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  animationDelay: `${index * 0.1}s`,
                  position: 'relative',
                  cursor: 'pointer',
                  '&:hover': {
                    boxShadow: 3,
                  },
                }}
              >
                <Box sx={{ position: 'relative', overflow: 'hidden', borderRadius: '20px 20px 0 0' }}>
                  {recipe.images && recipe.images.length > 0 ? (
                    <SafeImage
                      src={recipe.images[0]}
                      alt={recipe.name}
                      height="280px"
                      fallbackText={recipe.name}
                      sx={{
                        transition: 'transform 0.5s ease',
                        '&:hover': {
                          transform: 'scale(1.05)'
                        }
                      }}
                    />
                  ) : (
                    <Box height="280px" bgcolor="#eee" display="flex" alignItems="center" justifyContent="center">
                      <RestaurantMenu sx={{ fontSize: 60, color: '#ccc' }} />
                    </Box>
                  )}
                  <Chip
                    label={recipe.cuisine}
                    color="primary"
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
                  <Box mb={2}>
                    <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 700, lineHeight: 1.2, color: '#2C1810' }}>
                      {recipe.name}
                    </Typography>
                  </Box>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3, flexGrow: 1, lineHeight: 1.6 }}>
                    {recipe.description.length > 120
                      ? recipe.description.substring(0, 120) + '...'
                      : recipe.description}
                  </Typography>

                  <Divider sx={{ mb: 2, opacity: 0.6 }} />

                  <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item xs={6}>
                      <Box display="flex" alignItems="center" color="text.secondary">
                        <AccessTime fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
                        <Typography variant="caption" fontWeight="600">
                          {recipe.cookTime}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box display="flex" alignItems="center" color="text.secondary">
                        <PersonOutline fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
                        <Typography variant="caption" fontWeight="600">
                          {recipe.servings} Servings
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box display="flex" alignItems="center" color="text.secondary">
                        <LocalFireDepartment fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
                        <Typography variant="caption" fontWeight="600">
                          {recipe.difficulty}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>

                  <Box sx={{ mt: 'auto', pt: 1 }}>
                    {recipe.tags && recipe.tags.map((tag, i) => (
                      <Chip
                        key={i}
                        label={tag}
                        size="small"
                        variant="outlined"
                        sx={{
                          mr: 0.5,
                          mb: 0.5,
                          fontSize: '0.7rem',
                          borderColor: 'rgba(0,0,0,0.1)',
                          bgcolor: 'rgba(0,0,0,0.02)'
                        }}
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        {selectedRecipe && (
          <>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>{selectedRecipe.name}</span>
              <IconButton onClick={() => setOpenDialog(false)}>
                <Close />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Box sx={{ mb: 3 }}>
                {selectedRecipe.images && selectedRecipe.images.length > 0 ? (
                  <SafeImage
                    src={selectedRecipe.images[0]}
                    alt={selectedRecipe.name}
                    height="400px"
                    sx={{ borderRadius: 2 }}
                  />
                ) : (
                  <Box height="400px" bgcolor="#eee" display="flex" alignItems="center" justifyContent="center" borderRadius={2}>
                    <RestaurantMenu sx={{ fontSize: 80, color: '#ccc' }} />
                  </Box>
                )}
              </Box>

              <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                {t('common.description')}
              </Typography>
              <Typography variant="body2" paragraph sx={{ mb: 3, lineHeight: 1.8 }}>
                {selectedRecipe.description}
              </Typography>

              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    {t('recipes.prepTime')}
                  </Typography>
                  <Typography variant="body2">{selectedRecipe.prepTime}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    {t('recipes.cookTime')}
                  </Typography>
                  <Typography variant="body2">{selectedRecipe.cookTime}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    {t('recipes.servings')}
                  </Typography>
                  <Typography variant="body2">{selectedRecipe.servings} {t('recipes.servings')}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    {t('recipes.difficulty')}
                  </Typography>
                  <Typography variant="body2">{selectedRecipe.difficulty}</Typography>
                </Grid>
              </Grid>

              <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                {t('recipes.ingredients')}
              </Typography>
              <Box sx={{ mb: 3 }}>
                {selectedRecipe.ingredients && selectedRecipe.ingredients.map((ingredient, idx) => (
                  <Typography key={idx} variant="body2" sx={{ mb: 1 }}>
                    • {ingredient}
                  </Typography>
                ))}
              </Box>

              <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                {t('recipes.instructions')}
              </Typography>
              <Box sx={{ mb: 3 }}>
                {selectedRecipe.instructions && selectedRecipe.instructions.map((instruction, idx) => (
                  <Typography key={idx} variant="body2" sx={{ mb: 2, lineHeight: 1.8 }}>
                    <strong>{idx + 1}.</strong> {instruction}
                  </Typography>
                ))}
              </Box>

              <Divider sx={{ my: 2 }} />

              <CommentSection 
                itemId={selectedRecipe._id}
                itemType="recipe"
                itemName={selectedRecipe.name}
              />
            </DialogContent>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default Recipes;
