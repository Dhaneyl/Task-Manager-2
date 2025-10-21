import React, { createContext, useContext, useState, useEffect } from 'react';
import type { AuthContextType, AuthUser, RegisterFormData } from '../types';
import { authApi } from '../services/api';
import toast from 'react-hot-toast';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in (has valid token)
    const checkAuth = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          // Validate token by fetching current user
          const userData = await authApi.getMe();
          setUser({
            id: userData.id,
            name: userData.name,
            email: userData.email,
            photo: userData.photo,
            phone: userData.phone,
            bio: userData.bio,
            createdAt: userData.createdAt,
          });
          setIsAuthenticated(true);
        } catch (error) {
          // Token is invalid or expired
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
          setIsAuthenticated(false);
        }
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string, rememberMe: boolean): Promise<boolean> => {
    try {
      const response = await authApi.login(email, password);

      // Store token
      localStorage.setItem('token', response.token);

      // Store user data
      const authUser: AuthUser = {
        id: response.user.id,
        name: response.user.name,
        email: response.user.email,
        photo: response.user.photo,
        phone: response.user.phone,
        bio: response.user.bio,
        createdAt: response.user.createdAt,
      };

      setUser(authUser);
      setIsAuthenticated(true);

      if (rememberMe) {
        localStorage.setItem('user', JSON.stringify(authUser));
      }

      toast.success(`Welcome back, ${response.user.name}!`);
      return true;
    } catch (error: any) {
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.message || 'Invalid email or password';
      toast.error(errorMessage);
      return false;
    }
  };

  const register = async (data: RegisterFormData): Promise<boolean> => {
    try {
      // Validate passwords match
      if (data.password !== data.confirmPassword) {
        toast.error('Passwords do not match');
        return false;
      }

      const response = await authApi.register(data);

      // Store token
      localStorage.setItem('token', response.token);

      // Store user data
      const authUser: AuthUser = {
        id: response.user.id,
        name: response.user.name,
        email: response.user.email,
        photo: response.user.photo,
        phone: response.user.phone,
        bio: response.user.bio,
        createdAt: response.user.createdAt,
      };

      setUser(authUser);
      setIsAuthenticated(true);

      localStorage.setItem('user', JSON.stringify(authUser));

      toast.success(`Welcome, ${response.user.name}! Your account has been created.`);
      return true;
    } catch (error: any) {
      console.error('Registration error:', error);
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(errorMessage);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
  };

  const updateProfile = async (data: Partial<AuthUser>) => {
    try {
      const updatedUser = await authApi.updateProfile(data);

      const authUser: AuthUser = {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        photo: updatedUser.photo,
        phone: updatedUser.phone,
        bio: updatedUser.bio,
        createdAt: updatedUser.createdAt,
      };

      setUser(authUser);
      localStorage.setItem('user', JSON.stringify(authUser));
      toast.success('Profile updated successfully');
    } catch (error: any) {
      console.error('Update profile error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to update profile';
      toast.error(errorMessage);
    }
  };

  // Don't render children until we've checked authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-coral-500"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
