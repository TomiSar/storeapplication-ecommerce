import { type ReactNode, useEffect, useReducer } from 'react';
import { AuthContext } from '../contexts/authContext';
import type { AuthState } from '../types';

/* ===== AUTH ACTION TYPES ===== */
type AuthAction =
  | { type: 'LOGIN_SUCCESS'; payload: { jwtToken: string; user: Record<string, unknown> } }
  | { type: 'LOGOUT' };

/* ===== REDUCER ===== */
const authReducer = (prevState: AuthState, action: AuthAction) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...prevState,
        jwtToken: action.payload.jwtToken,
        user: action.payload.user,
        isAuthenticated: true,
      };
    case 'LOGOUT':
      return {
        ...prevState,
        jwtToken: null,
        user: null,
        isAuthenticated: false,
      };
    default:
      return prevState;
  }
};

/* ===== AUTH INITIAL LOCAL STORAGE STATE ===== */
const getInitialAuthState = (): AuthState => {
  try {
    const jwtToken = localStorage.getItem('jwtToken');
    const user = localStorage.getItem('user');
    if (jwtToken && user) {
      return {
        jwtToken,
        user: JSON.parse(user),
        isAuthenticated: true,
      };
    }
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
  }
  return {
    jwtToken: null,
    user: null,
    isAuthenticated: false,
  };
};

interface AuthProviderProps {
  children: ReactNode;
}

/* ===== AUTH PROVIDER ===== */
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, dispatch] = useReducer(authReducer, {}, getInitialAuthState);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      if (authState.isAuthenticated) {
        localStorage.setItem('jwtToken', authState.jwtToken!);
        localStorage.setItem('user', JSON.stringify(authState.user));
      } else {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('user');
      }
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  }, [authState]);

  /* Actions */
  const loginSuccess = (jwtToken: string, user: Record<string, unknown>) => {
    dispatch({ type: 'LOGIN_SUCCESS', payload: { jwtToken, user } });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{
        jwtToken: authState.jwtToken,
        user: authState.user,
        isAuthenticated: authState.isAuthenticated,
        loginSuccess,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
