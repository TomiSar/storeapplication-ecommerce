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

// Format user roles for display (ROLE_ADMIN -> Admin, ROLE_USER -> User, etc.)
export const formatUserRoles = (roles: string): string => {
  return roles
    .split(',')
    .map((role) => {
      if (role === 'ROLE_ADMIN') return 'Admin';
      if (role === 'ROLE_USER') return 'User';
      if (role === 'ROLE_OPS_ENG') return 'Ops Engineer';
      if (role === 'ROLE_QA_ENG') return 'QA Engineer';
      return role
        .replace(/^ROLE_/, '')
        .replace(/_/g, ' ')
        .toLowerCase()
        .replace(/\b\w/g, (c) => c.toUpperCase());
    })
    .join(', ');
};
