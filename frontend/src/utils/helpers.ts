// Format username: Remove @ and capitalize first letter
export const formatUsername = (username: string): string =>
  username.split('@')[0].replace(/^./, (char) => char.toUpperCase());
