export type UserRole = 'ADMIN' | 'EMPLOYEE';

export const getHomeRouteForRole = (role: UserRole): string => {
    switch (role) {
        case 'ADMIN':
            return '/admin/dashboard';
        case 'EMPLOYEE':
            return '/employee/dashboard';
        default:
            return '/';
    }
};
