export function uniqueEmail(prefix = 'user'): string {
  return `${prefix}.${Date.now()}@test.local`;
}

export const DEFAULT_PASSWORD = 'Pazzw0rd!';
