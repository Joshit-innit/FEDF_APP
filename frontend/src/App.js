import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Festivals from './pages/Festivals';
import Traditions from './pages/Traditions';
import Recipes from './pages/Recipes';
import Culture from './pages/Culture';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './App.css';

// Vibrant Indian-inspired theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#FF6B35', // Vibrant Orange
      light: '#FF9E75',
      dark: '#C43C00',
      contrastText: '#fff',
    },
    secondary: {
      main: '#00897B', // Teal Green
      light: '#4EBAAA',
      dark: '#005B4F',
      contrastText: '#fff',
    },
    background: {
      default: '#FDFBF7', // Warm Off-white
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1A1A1A',
      secondary: '#424242',
    },
    error: {
      main: '#D32F2F',
    },
    warning: {
      main: '#FFA000',
    },
    info: {
      main: '#1976D2',
    },
    success: {
      main: '#388E3C',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 800,
      color: '#D84315', // Deep Orange
      letterSpacing: '-0.5px',
    },
    h2: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
      color: '#BF360C',
    },
    h3: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
      color: '#E65100',
    },
    h4: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
    },
    h5: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
    },
    h6: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 600,
      letterSpacing: '0.5px',
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
      letterSpacing: '0.5px',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'visible', // Allow hover effects to pop out
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          padding: '10px 28px',
          boxShadow: '0 4px 12px rgba(255, 107, 53, 0.2)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 20px rgba(255, 107, 53, 0.3)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #FF6B35 0%, #F4511E 100%)',
        },
        containedSecondary: {
          background: 'linear-gradient(135deg, #00897B 0%, #00695C 100%)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          color: '#1A1A1A',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
        },
        filled: {
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Navbar />
          <div className="tricolor-bar" />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/festivals" element={<Festivals />} />
            <Route path="/traditions" element={<Traditions />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/culture" element={<Culture />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;