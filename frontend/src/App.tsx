import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import {CssBaseline, ThemeProvider, createTheme} from "@mui/material";
import {LoginPage} from "./components/auth/LoginPage";
import {EmployeeLoginPage} from "./components/auth/EmployeeLoginPage";
import {ProtectedRoute} from "./components/auth/ProtectedRoute";
import {AdminRoute} from "./components/auth/AdminRoute";
import {AuthProvider} from "./context/AuthContext";
import {Dashboard} from "./components/Dashboard";
import {EmployeeProfile} from "./components/employees/EmployeeProfile";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
            {/* Public routes */}
            <Route path="/admin" element={<LoginPage />} />
            <Route path="/employee" element={<EmployeeLoginPage />} />
            
            {/* Admin routes */}
            <Route path="/dashboard" element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            } />

            {/* Employee routes */}
            <Route path="/employee-dashboard" element={
              <ProtectedRoute>
                <EmployeeProfile />
              </ProtectedRoute>
            } />
            
            {/* Default routes */}
            <Route path="/login" element={<Navigate to="/admin" replace />} />
            <Route path="/" element={<Navigate to="/admin" replace />} />
          </Routes>
          <ToastContainer />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;