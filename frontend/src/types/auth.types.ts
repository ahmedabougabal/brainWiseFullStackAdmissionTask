export interface User {
    id: number;
    email: string;
    role: 'ADMIN' | 'USER';
}