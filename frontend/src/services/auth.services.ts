import axios from 'axios';
import {LoginCredentials, AuthResponse} from "../types/auth.types";

const API_URL = "http://localhost:8000/api/v1"; // APIS from the backend

export const authService = {
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const response = await axios.post<AuthResponse>(
            `${API_URL}/auth/login`,
            credentials,
        );
        if (response.data.access){
            localStorage.setItem('token', response.data.access);
            localStorage.setItem('refresh', response.data.refresh);
        }
        return response.data;
    },
    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh');
    },
    getCurrentUser(): AuthResponse['user'] | null {
        const token = localStorage.getItem('token');
        return token ? JSON.parse(atob(token.split('.')[1])).user : null;
    }
}
