export interface AuthState {
  jwtToken: string | null;
  user: Record<string, unknown> | null;
  isAuthenticated: boolean;
}

export interface AuthContextType extends AuthState {
  loginSuccess: (jwtToken: string, user: Record<string, unknown>) => void;
  logout: () => void;
}
