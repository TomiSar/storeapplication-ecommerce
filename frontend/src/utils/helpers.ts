// Format username: Remove @ and capitalize first letter
export const formatUsername = (username: string): string =>
  username.split(' ')[0].replace(/^./, (char) => char.toUpperCase());

// Check if a user has the 'ROLE_ADMIN' role
export const isAdminUser = (roles: string): boolean => {
  return roles.split(',').includes('ROLE_ADMIN');
};
