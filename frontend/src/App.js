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

// Indian-inspired theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#FF6B35',
      light: '#FFA270',
      dark: '#A63F03',
    },
    secondary: {
      main: '#2E7D32',
      light: '#60AD5E',
      dark: '#1B5E20',
    },
    info: {
      main: '#006A71',
    },
    warning: {
      main: '#FFB300',
    },
    background: {
      default: '#FBF4E6',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2E2E2E',
      secondary: '#6B6B6B',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Noto Serif", "Noto Serif Devanagari", serif',
      fontSize: '2.8rem',
      fontWeight: 700,
      color: '#8C2F00',
      letterSpacing: '0.5px',
    },
    h2: {
      fontFamily: '"Noto Serif", "Noto Serif Devanagari", serif',
      fontSize: '2.2rem',
      fontWeight: 600,
      color: '#A63F03',
    },
    h3: {
      fontFamily: '"Noto Serif", "Noto Serif Devanagari", serif',
      fontSize: '1.6rem',
      fontWeight: 600,
      color: '#FF6B35',
    },
    button: {
      fontWeight: 600,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'linear-gradient(90deg, #FF6B35 0%, #BF360C 100%)',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          boxShadow: '0 6px 14px rgba(0, 0, 0, 0.12)',
          border: '1px solid rgba(255,107,53,0.15)'
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