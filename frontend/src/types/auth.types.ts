export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthResponse {
    access: string;
    refresh: string;
    user:{
        id: number;
        email: string;
        role: 'ADMIN'|'USER';
        employee_id?: number;
    };
}

export interface AuthState {
    isAuthenticated: boolean;
    user: AuthResponse['user'] | null;
    loading: boolean;
    error: string | null;
}