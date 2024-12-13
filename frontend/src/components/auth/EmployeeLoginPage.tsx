import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Alert,
  Paper,
  useTheme,
  Tab,
  Tabs,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { LoginCredentials } from '../../types/auth.types';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { toast } from 'react-toastify';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`auth-tabpanel-${index}`}
      aria-labelledby={`auth-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

interface RegisterData extends LoginCredentials {
  username: string;
  confirmPassword: string;
}

export const EmployeeLoginPage: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const { register: loginRegister, handleSubmit: handleLoginSubmit, formState: { errors: loginErrors } } = useForm<LoginCredentials>();
  const { register: registerRegister, handleSubmit: handleRegisterSubmit, formState: { errors: registerErrors }, watch } = useForm<RegisterData>();
  const { login, error, loading } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const password = watch('password', '');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const onLogin = async (data: LoginCredentials) => {
    try {
      await login(data);
      navigate('/employee-dashboard');
    } catch (err) {
      // Error is handled by the auth context
    }
  };

  const onRegister = async (data: RegisterData) => {
    try {
      if (data.password !== data.confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }
      
      const response = await api.post('/auth/register/', {
        email: data.email,
        username: data.username,
        password: data.password,
        role: 'EMPLOYEE',
        status: 'PENDING' // New users start with pending status
      });
      
      toast.success('Registration successful! Please wait for admin approval to login.');
      setTabValue(0); // Switch to login tab
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || 'Invalid Operation, Email already exists, or may be some other error';
      toast.error(errorMessage);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: theme.spacing(2),
      }}
    >
      <Container component="main" maxWidth="xs">
        <Paper
          elevation={24}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 2,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: '12px',
              backgroundColor: theme.palette.primary.main,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 2,
              transform: 'rotate(-10deg)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            }}
          >
            <PersonIcon sx={{ color: 'white', fontSize: 32 }} />
          </Box>
          <Typography
            component="h1"
            variant="h4"
            sx={{
              mb: 1,
              fontWeight: 700,
              color: theme.palette.primary.main,
            }}
          >
            BrainWise
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              mb: 3,
              color: theme.palette.text.secondary,
              textAlign: 'center',
            }}
          >
            Employee Portal
          </Typography>

          <Box sx={{ width: '100%', mb: 3 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="fullWidth"
              sx={{
                borderBottom: 1,
                borderColor: 'divider',
              }}
            >
              <Tab label="Login" />
              <Tab label="Register" />
            </Tabs>
          </Box>

          <TabPanel value={tabValue} index={0}>
            <Box component="form" onSubmit={handleLoginSubmit(onLogin)} sx={{ width: '100%' }}>
              {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
                autoFocus
                {...loginRegister('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                error={!!loginErrors.email}
                helperText={loginErrors.email?.message}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  },
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                {...loginRegister('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
                error={!!loginErrors.password}
                helperText={loginErrors.password?.message}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  },
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{
                  mt: 3,
                  mb: 2,
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                }}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </Box>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Box component="form" onSubmit={handleRegisterSubmit(onRegister)} sx={{ width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="register-email"
                label="Email Address"
                autoComplete="email"
                {...registerRegister('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                error={!!registerErrors.email}
                helperText={registerErrors.email?.message}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  },
                }}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                {...registerRegister('username', {
                  required: 'Username is required',
                })}
                error={!!registerErrors.username}
                helperText={registerErrors.username?.message}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  },
                }}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                id="register-password"
                {...registerRegister('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
                error={!!registerErrors.password}
                helperText={registerErrors.password?.message}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  },
                }}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                label="Confirm Password"
                type="password"
                id="confirm-password"
                {...registerRegister('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: value => value === password || 'Passwords do not match'
                })}
                error={!!registerErrors.confirmPassword}
                helperText={registerErrors.confirmPassword?.message}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  },
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                }}
              >
                Register
              </Button>
            </Box>
          </TabPanel>

          <Button
            component={Link}
            to="/"
            variant="outlined"
            fullWidth
            sx={{
              mt: 2,
              py: 1.5,
              textTransform: 'none',
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
              '&:hover': {
                borderColor: theme.palette.primary.dark,
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            Admin Portal
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};
