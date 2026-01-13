import dayjs from 'dayjs';
import 'dayjs/locale/fi';

// Format username: Remove @ and capitalize first letter
export const formatUsername = (username: string): string =>
  username.split(' ')[0].replace(/^./, (char) => char.toUpperCase());

// Check if a user has the 'ROLE_ADMIN' role
export const isAdminUser = (roles: string): boolean => {
  return roles.split(',').includes('ROLE_ADMIN');
};

// Format ISO date string to a more readable format
export const formatDate = (isoDate: string) => {
  if (!isoDate) return 'N/A';
  const date = dayjs(isoDate).locale('fi');
  if (!date.isValid()) return 'N/A';
  return date.format('DD.MM.YYYY');
};
