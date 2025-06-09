
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  isAdmin: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error('Error loading user from localStorage:', error);
      localStorage.removeItem('user');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    console.log('Login attempt:', email);
    
    // Hardcoded admin credentials
    if (email === 'admin@expressship.com' && password === 'admin123') {
      const adminUser: User = {
        id: 'admin-1',
        email: 'admin@expressship.com',
        name: 'Admin User',
        role: 'admin'
      };
      setUser(adminUser);
      localStorage.setItem('user', JSON.stringify(adminUser));
      console.log('Admin login successful');
      return true;
    }

    // Simulate user login (in real app, this would be API call)
    if (email && password && password.length >= 6) {
      const regularUser: User = {
        id: 'user-' + Date.now(),
        email,
        name: email.split('@')[0],
        role: 'user'
      };
      setUser(regularUser);
      localStorage.setItem('user', JSON.stringify(regularUser));
      console.log('User login successful');
      return true;
    }

    console.log('Login failed');
    return false;
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    console.log('Registration attempt:', email, name);
    
    // Simulate registration (in real app, this would be API call)
    if (email && password && password.length >= 6 && name) {
      const newUser: User = {
        id: 'user-' + Date.now(),
        email,
        name,
        role: 'user'
      };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      console.log('Registration successful');
      return true;
    }
    console.log('Registration failed');
    return false;
  };

  const logout = () => {
    console.log('User logged out');
    setUser(null);
    localStorage.removeItem('user');
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isAdmin, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
