export const getHomeRouteForRole = (role: string | undefined): string => {
  console.log('Getting home route for role:', role);
  
  // Convert role to uppercase for case-insensitive comparison
  const normalizedRole = role?.toUpperCase();
  
  switch (normalizedRole) {
    case 'ADMIN' :
      return '/dashboard';
    case 'EMPLOYEE':
      return '/employees/profile'; 
    default:
      console.warn('Unknown or undefined role:', role);
      return '/login';
  }
};
