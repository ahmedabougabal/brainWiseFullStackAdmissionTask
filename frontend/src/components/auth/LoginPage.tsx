// src/components/auth/LoginPage.tsx
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
  MenuItem,
} from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import { LoginCredentials } from '../../types/auth.types';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { api } from '../../services/api';

interface RegisterData extends LoginCredentials {
  username: string;
  confirmPassword: string;
  role: 'ADMIN' | 'EMPLOYEE';
}

export const LoginPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { register: registerField, handleSubmit, formState: { errors }, watch } = useForm<RegisterData>({
    defaultValues: {
      role: 'EMPLOYEE'
    }
  });
  const { login, error, loading } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const password = watch('password', '');

  const onSubmit = async (data: RegisterData) => {
    try {
      if (isLogin) {
        await login(data);
        navigate('/dashboard');
      } else {
        // Registration
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
        setIsLogin(true);
      }
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
            <BusinessIcon sx={{ color: 'white', fontSize: 32 }} />
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
            Employee Management Portal
          </Typography>

          <Tabs value={isLogin ? 0 : 1} onChange={(_, newValue) => setIsLogin(newValue === 0)} sx={{ mb: 3 }}>
            <Tab label="LOGIN" />
            <Tab label="REGISTER" />
          </Tabs>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1, width: '100%' }}>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              autoFocus
              {...registerField('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                },
              }}
            />

            {!isLogin && (
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                {...registerField('username', {
                  required: 'Username is required',
                })}
                error={!!errors.username}
                helperText={errors.username?.message}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  },
                }}
              />
            )}

            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              {...registerField('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                },
              }}
            />

            {!isLogin && (
              <>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Confirm Password"
                  type="password"
                  {...registerField('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: value => value === password || 'Passwords do not match'
                  })}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    },
                  }}
                />

                <TextField
                  select
                  margin="normal"
                  required
                  fullWidth
                  label="Role"
                  {...registerField('role')}
                  value="EMPLOYEE"
                  disabled
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'rgba(211, 211, 211, 0.3)',
                    },
                    '& .Mui-disabled': {
                      color: 'rgba(0, 0, 0, 0.6)',
                      '-webkit-text-fill-color': 'rgba(0, 0, 0, 0.6)',
                    },
                  }}
                >
                  <MenuItem value="EMPLOYEE">Employee</MenuItem>
                </TextField>
              </>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 4,
                mb: 2,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                textTransform: 'none',
                borderRadius: 2,
                backgroundColor: theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark,
                },
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              }}
              disabled={loading}
            >
              {isLogin ? (loading ? 'Signing in...' : 'Sign In') : 'Register'}
            </Button>

            {isLogin && (
              <Button
                component={Link}
                to="/employee"
                variant="outlined"
                fullWidth
                sx={{
                  py: 1.5,
                  textTransform: 'none',
                  borderRadius: 2,
                  borderColor: theme.palette.primary.main,
                  color: theme.palette.primary.main,
                  '&:hover': {
                    borderColor: theme.palette.primary.dark,
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                Employee Portal
              </Button>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};