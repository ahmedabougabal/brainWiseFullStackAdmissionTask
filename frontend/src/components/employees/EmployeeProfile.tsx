// src/components/employees/EmployeeProfile.tsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Chip,
  Grid,
  Divider,
  CircularProgress,
  useTheme,
} from '@mui/material';
import {
  Person as PersonIcon,
  Business as BusinessIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Work as WorkIcon,
  Today as TodayIcon,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { employeeService } from '../../services/employee.service';

interface EmployeeDetails {
  name: string;
  email: string;
  mobile_number: string;
  address: string;
  designation: string;
  status: string;
  hired_on: string | null;
  company: {
    name: string;
  };
  department: {
    name: string;
  };
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'HIRED':
      return 'success';
    case 'INTERVIEW_SCHEDULED':
      return 'warning';
    case 'PENDING':
      return 'info';
    case 'REJECTED':
      return 'error';
    default:
      return 'default';
  }
};

const formatDate = (dateString: string | null) => {
  if (!dateString) return 'Not available';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const EmployeeProfile: React.FC = () => {
  const [employee, setEmployee] = useState<EmployeeDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const theme = useTheme();

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        if (user?.id) {
          const response = await employeeService.getById(user.id);
          console.log('Employee response:', response.data);  
          setEmployee({
            name: response.data.name,
            email: response.data.email,
            mobile_number: response.data.mobile_number,
            address: response.data.address,
            designation: response.data.designation,
            status: response.data.status,
            hired_on: response.data.hired_on,
            company: {
              name: response.data.company?.name || ''
            },
            department: {
              name: response.data.department?.name || ''
            }
          });
        }
      } catch (err) {
        setError('Failed to load employee details');
        console.error('Error fetching employee details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeDetails();
  }, [user]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !employee) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography color="error">{error || 'Employee not found'}</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box display="flex" alignItems="center" mb={4}>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: 2,
              backgroundColor: theme.palette.primary.main,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 3,
            }}
          >
            <PersonIcon sx={{ fontSize: 40, color: 'white' }} />
          </Box>
          <Box>
            <Typography variant="h4" gutterBottom>
              {employee.name}
            </Typography>
            <Chip
              label={employee.status.replace('_', ' ')}
              color={getStatusColor(employee.status) as any}
              sx={{ fontWeight: 500 }}
            />
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center" mb={2}>
              <BusinessIcon sx={{ mr: 2, color: theme.palette.primary.main }} />
              <Box>
                <Typography variant="caption" color="textSecondary">
                  Company
                </Typography>
                <Typography variant="body1">{employee.company.name}</Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center" mb={2}>
              <WorkIcon sx={{ mr: 2, color: theme.palette.primary.main }} />
              <Box>
                <Typography variant="caption" color="textSecondary">
                  Department
                </Typography>
                <Typography variant="body1">{employee.department.name}</Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center" mb={2}>
              <EmailIcon sx={{ mr: 2, color: theme.palette.primary.main }} />
              <Box>
                <Typography variant="caption" color="textSecondary">
                  Email
                </Typography>
                <Typography variant="body1">{employee.email}</Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center" mb={2}>
              <PhoneIcon sx={{ mr: 2, color: theme.palette.primary.main }} />
              <Box>
                <Typography variant="caption" color="textSecondary">
                  Mobile
                </Typography>
                <Typography variant="body1">{employee.mobile_number}</Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box display="flex" alignItems="center" mb={2}>
              <LocationIcon sx={{ mr: 2, color: theme.palette.primary.main }} />
              <Box>
                <Typography variant="caption" color="textSecondary">
                  Address
                </Typography>
                <Typography variant="body1">{employee.address}</Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center" mb={2}>
              <WorkIcon sx={{ mr: 2, color: theme.palette.primary.main }} />
              <Box>
                <Typography variant="caption" color="textSecondary">
                  Designation
                </Typography>
                <Typography variant="body1">{employee.designation}</Typography>
              </Box>
            </Box>
          </Grid>

          {employee.hired_on && (
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center" mb={2}>
                <TodayIcon sx={{ mr: 2, color: theme.palette.primary.main }} />
                <Box>
                  <Typography variant="caption" color="textSecondary">
                    Hired On
                  </Typography>
                  <Typography variant="body1">{formatDate(employee.hired_on)}</Typography>
                </Box>
              </Box>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Container>
  );
};
