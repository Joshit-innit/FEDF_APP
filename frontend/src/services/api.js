import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Festivals API
export const festivalsAPI = {
  getAll: () => api.get('/festivals'),
  getById: (id) => api.get(`/festivals/${id}`),
  create: (data) => api.post('/festivals', data),
  update: (id, data) => api.put(`/festivals/${id}`, data),
  delete: (id) => api.delete(`/festivals/${id}`),
  getByRegion: (region) => api.get(`/festivals/region/${region}`),
  getByCategory: (category) => api.get(`/festivals/category/${category}`),
};

// Traditions API
export const traditionsAPI = {
  getAll: () => api.get('/traditions'),
  getById: (id) => api.get(`/traditions/${id}`),
  create: (data) => api.post('/traditions', data),
  update: (id, data) => api.put(`/traditions/${id}`, data),
  delete: (id) => api.delete(`/traditions/${id}`),
  getByRegion: (region) => api.get(`/traditions/region/${region}`),
  getByCategory: (category) => api.get(`/traditions/category/${category}`),
};

// Recipes API
export const recipesAPI = {
  getAll: () => api.get('/recipes'),
  getById: (id) => api.get(`/recipes/${id}`),
  create: (data) => api.post('/recipes', data),
  update: (id, data) => api.put(`/recipes/${id}`, data),
  delete: (id) => api.delete(`/recipes/${id}`),
  getByCuisine: (cuisine) => api.get(`/recipes/cuisine/${cuisine}`),
  getByRegion: (region) => api.get(`/recipes/region/${region}`),
  getByDifficulty: (difficulty) => api.get(`/recipes/difficulty/${difficulty}`),
};

// Culture API
export const cultureAPI = {
  getAll: () => api.get('/culture'),
  getById: (id) => api.get(`/culture/${id}`),
  create: (data) => api.post('/culture', data),
  update: (id, data) => api.put(`/culture/${id}`, data),
  delete: (id) => api.delete(`/culture/${id}`),
  getByCategory: (category) => api.get(`/culture/category/${category}`),
  getByRegion: (region) => api.get(`/culture/region/${region}`),
};

// Auth API
export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  signup: (name, email, password) => api.post('/auth/signup', { name, email, password }),
};

export default api;
