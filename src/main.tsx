import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AuthProvider from './providers/AuthProvider';
import { CssBaseline } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#10141F", // Dark blue
    },
    secondary: {
      main: "#161d2f", // Light blue
    },
    background: {
      default: "#10141F", // Dark background
      paper: "#161d2f", // Slightly lighter dark background for surfaces
    },
    text: {
      primary: '#ffffff', // White text for readability
      secondary: '#FAF9F6', // Grey text for secondary information
    },
  },
  components: {
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: '#ffffff',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#ffffff',
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ThemeProvider theme={darkTheme}>
    <CssBaseline />
      <AuthProvider>
          <App />
      </AuthProvider>
    </ThemeProvider>
);
