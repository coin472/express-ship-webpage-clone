
import { adminUser } from '@/lib/adminUser';
import { ExpressUser, signIn, signOut, signUp } from '@/lib/pocketbase';
import { createContext, useContext, useState, useEffect } from 'react';



interface AuthContextType {
  user: ExpressUser | null;
  login: (email: string, password: string) => Promise<boolean|string>;
  logout: () => void;
  register: (email: string, password: string,passwordConfirm:string, name: string) => Promise<boolean>;
  isAdmin?: boolean;
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
  const [user, setUser] = useState<ExpressUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin,setIsAdmin] = useState(false)



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

const login = async (email: string, password: string): Promise<boolean | string> => {
  // ✅ Admin login (exit early)
  if (email === adminUser.email && password === adminUser.password) {
    setUser(adminUser);
    localStorage.setItem('user', JSON.stringify(adminUser));
    setIsAdmin(true)
    return true;
  }

  // ✅ Regular user login
  if (email && password && password.length >= 6) {
    const login = await signIn(email, password);

    if (!login.success) {
      return login.error; // ❌ Login failed
    }

    const getUser = login.user;
    setUser(getUser);
    localStorage.setItem('user', JSON.stringify(getUser));
    return true;
  }

  // ⚠️ Invalid input
  return false;
};

  
  const register = async (email: string, password: string, passwordConfirm: string, name: string): Promise<boolean> => {
    // Simulate registration (in real app, this would be API call)
    if (email && password && password.length >= 6 && name) {
      const createUser = await signUp(email,password,passwordConfirm,name)
      const user = createUser?.user
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      console.log('Registration successful');
      return true;
    }
    return false;
  };

  const logout = async () => {
    await signOut();
    console.log('user logged out');
    setUser(null);
    localStorage.removeItem('user');
  };


  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin, register, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
