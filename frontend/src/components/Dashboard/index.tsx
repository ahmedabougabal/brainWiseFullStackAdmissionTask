import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Snackbar,
  Alert
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import { api } from '../../services/api';
import { useAuth } from '../../hooks/useAuth'; 

interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  mobile_number: string;
  address: string;
  designation: string;
  department: number;
  department_name?: string;
  company: number;
  company_name?: string;
  status: string;
  hired_on?: string;
  days_employed?: number;
}

interface Department {
  id: number;
  name: string;
}

export const Dashboard: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  const { isAuthenticated, user, signOut } = useAuth();

  useEffect(() => {
    console.log('Dashboard mounted');
    console.log('Auth state:', { isAuthenticated, user });
    fetchEmployees();
    fetchDepartments();
  }, []);

  const fetchEmployees = async () => {
    try {
      console.log('Fetching employees...');
      const response = await api.get('/employees/');
      console.log('Employees response:', response.data);
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
      setSnackbar({
        open: true,
        message: 'Failed to fetch employees',
        severity: 'error'
      });
    }
  };

  const fetchDepartments = async () => {
    try {
      console.log('Fetching departments...');
      const response = await api.get('/departments/');
      console.log('Departments response:', response.data);
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      console.log('Deleting employee...');
      await api.delete(`/employees/${id}/`);
      console.log('Employee deleted successfully');
      setSnackbar({
        open: true,
        message: 'Employee deleted successfully',
        severity: 'success'
      });
      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
      setSnackbar({
        open: true,
        message: 'Failed to delete employee',
        severity: 'error'
      });
    }
  };

  const handleSubmit = async () => {
    try {
      if (selectedEmployee) {
        console.log('Updating employee...');
        await api.put(`/employees/${selectedEmployee.id}/`, formData);
        console.log('Employee updated successfully');
      } else {
        console.log('Creating employee...');
        await api.post('/employees/', formData);
        console.log('Employee created successfully');
      }
      setSnackbar({
        open: true,
        message: `Employee ${selectedEmployee ? 'updated' : 'created'} successfully`,
        severity: 'success'
      });
      setOpenDialog(false);
      fetchEmployees();
    } catch (error) {
      console.error(`Error ${selectedEmployee ? 'updating' : 'creating'} employee:`, error);
      setSnackbar({
        open: true,
        message: `Failed to ${selectedEmployee ? 'update' : 'create'} employee`,
        severity: 'error'
      });
    }
  };

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    mobile_number: '',
    address: '',
    designation: '',
    department: '',
    company: '',
  });

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, mt: 4 }}>
        <Typography variant="h4" component="h1">
          Employee Management Dashboard
        </Typography>
        <Box>
          <Button
            variant="contained"
            color="primary"
            startIcon={<LogoutIcon />}
            onClick={signOut}
            sx={{ mr: 2 }}
          >
            Sign Out
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => {
              setSelectedEmployee(null);
              setFormData({
                first_name: '',
                last_name: '',
                email: '',
                mobile_number: '',
                address: '',
                designation: '',
                department: '',
                company: '',
              });
              setOpenDialog(true);
            }}
            sx={{ mb: 2 }}
          >
            Add Employee
          </Button>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.first_name} {employee.last_name}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.department_name}</TableCell>
                <TableCell>{employee.designation}</TableCell>
                <TableCell>{employee.status}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => {
                      setSelectedEmployee(employee);
                      setFormData({
                        first_name: employee.first_name,
                        last_name: employee.last_name,
                        email: employee.email,
                        mobile_number: employee.mobile_number,
                        address: employee.address,
                        designation: employee.designation,
                        department: employee.department.toString(),
                        company: employee.company.toString(),
                      });
                      setOpenDialog(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(employee.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          {selectedEmployee ? 'Edit Employee' : 'Add Employee'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              label="First Name"
              value={formData.first_name}
              onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
            />
            <TextField
              label="Last Name"
              value={formData.last_name}
              onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
            />
            <TextField
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <TextField
              label="Mobile Number"
              value={formData.mobile_number}
              onChange={(e) => setFormData({ ...formData, mobile_number: e.target.value })}
            />
            <TextField
              label="Address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
            <TextField
              label="Designation"
              value={formData.designation}
              onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
            />
            <TextField
              select
              label="Department"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            >
              {departments.map((dept) => (
                <MenuItem key={dept.id} value={dept.id}>
                  {dept.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            >
              {/* Add company options here */}
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {selectedEmployee ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};
