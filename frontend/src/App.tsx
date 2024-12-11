import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import {CssBaseline, ThemeProvider, createTheme} from "@mui/material";
import {LoginPage} from "./components/auth/LoginPage";
import {ProtectedRoute} from "./components/auth/ProtectedRoute";
import {AuthProvider} from "./context/AuthContext";

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2'
    },
    secondary: {
      main: '#dc004e'
    },
  },
});

function App() {
  return (
      <ThemeProvider theme={theme}>
  <CssBaseline />
  <AuthProvider>
  <Router>
  <Routes>
  {/*here is the public routes */}
  <Route path="/login" element={<LoginPage />} />
  {/*here is the protected routes */}
<Route path="/dashboard" element={
  <ProtectedRoute><div>Dashboard (coming soon...)</div>
  </ProtectedRoute>} />
<Route path="/" element={<Navigate to="/login" replace />} />
  </Routes>
  </Router>
  </AuthProvider>
  </ThemeProvider>
  );
}

export default App;