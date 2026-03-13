import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  plan: 'basic' | 'featured';
  is_verified: boolean;
  verification_status: 'none' | 'pending' | 'approved' | 'rejected';
  avatar?: string;
  city: string;
  subscription_status: 'active' | 'expired' | 'cancelled';
  subscription_expires_at?: string;
  token: string;
}

export interface AuthAdmin {
  id: number;
  username: string;
  name: string;
  token: string;
}

interface AuthContextType {
  user: AuthUser | null;
  admin: AuthAdmin | null;
  isLoadingUser: boolean;
  loginUser: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loginAdmin: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logoutUser: () => void;
  logoutAdmin: () => void;
  updateUser: (data: Partial<AuthUser>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Mock users para demonstração
const MOCK_USER: AuthUser = {
  id: 1,
  name: 'Valentina Silva',
  email: 'valentina@email.com',
  phone: '16999990001',
  plan: 'featured',
  is_verified: true,
  verification_status: 'approved',
  avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop',
  city: 'Ribeirão Preto',
  subscription_status: 'active',
  subscription_expires_at: '2025-12-31',
  token: 'mock_user_token_123',
};

const MOCK_ADMIN: AuthAdmin = {
  id: 1,
  username: 'admin',
  name: 'Administrador',
  token: 'mock_admin_token_456',
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [admin, setAdmin] = useState<AuthAdmin | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  useEffect(() => {
    // Restaurar sessão do localStorage
    const savedUser = localStorage.getItem('kryska_user');
    const savedAdmin = localStorage.getItem('kryska_admin');
    if (savedUser) {
      try { setUser(JSON.parse(savedUser)); } catch {}
    }
    if (savedAdmin) {
      try { setAdmin(JSON.parse(savedAdmin)); } catch {}
    }
    setIsLoadingUser(false);
  }, []);

  const loginUser = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Mock login — em produção chama a API
    if (email === 'valentina@email.com' && password === '123456') {
      setUser(MOCK_USER);
      localStorage.setItem('kryska_user', JSON.stringify(MOCK_USER));
      return { success: true };
    }
    return { success: false, error: 'Email ou senha incorretos.' };
  };

  const loginAdmin = async (username: string, password: string): Promise<{ success: boolean; error?: string }> => {
    if (username === 'admin' && password === 'admin123') {
      setAdmin(MOCK_ADMIN);
      localStorage.setItem('kryska_admin', JSON.stringify(MOCK_ADMIN));
      return { success: true };
    }
    return { success: false, error: 'Usuário ou senha incorretos.' };
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('kryska_user');
  };

  const logoutAdmin = () => {
    setAdmin(null);
    localStorage.removeItem('kryska_admin');
  };

  const updateUser = (data: Partial<AuthUser>) => {
    if (user) {
      const updated = { ...user, ...data };
      setUser(updated);
      localStorage.setItem('kryska_user', JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider value={{ user, admin, isLoadingUser, loginUser, loginAdmin, logoutUser, logoutAdmin, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
