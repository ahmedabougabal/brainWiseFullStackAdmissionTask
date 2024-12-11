import api from './api';
import { Employee } from '../types/employee.types';

export const employeeService = {
  getAll: () => api.get<Employee[]>('/employees/'),
  getById: (id: number) => api.get<Employee>(`/employees/${id}/`),
  create: (data: Partial<Employee>) => api.post<Employee>('/employees/', data),
  update: (id: number, data: Partial<Employee>) => api.put<Employee>(`/employees/${id}/`, data),
  delete: (id: number) => api.delete(`/employees/${id}/`),
  updateStatus: (id: number, status: Employee['status']) =>
    api.patch<Employee>(`/employees/${id}/status/`, { status }),
};

export default employeeService;