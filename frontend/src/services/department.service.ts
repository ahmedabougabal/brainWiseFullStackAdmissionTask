import api from './api';
import { Department } from '../types/department.types';

export const departmentService = {
  getAll: () => api.get<Department[]>('/departments/'),
  getById: (id: number) => api.get<Department>(`/departments/${id}/`),
  create: (data: Partial<Department>) => api.post<Department>('/departments/', data),
  update: (id: number, data: Partial<Department>) => api.put<Department>(`/departments/${id}/`, data),
  delete: (id: number) => api.delete(`/departments/${id}/`),
};

export default departmentService;