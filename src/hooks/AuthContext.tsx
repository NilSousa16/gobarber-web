import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface AuthState {
  token: string;
  user: object;
}

interface SingInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: object;
  signIn(credentials: SingInCredentials): Promise<void>;
  signOut(): void;
}

// {} as AuthContext -  para inicializar o objeto vazio que é obrigatório
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// children - tudo o que o elemento recebe como filho
export const AuthProvider: React.FC = ({ children }) => {
  // Executado ao entrar na página ou realizar um refresh
  const [data, setData] = useState<AuthState>(() => {
    // Busca o token e user no localstorage do browser
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user');

    // Se existir os valores
    if (token && user) {
      return { token, user: JSON.parse(user) };
    }
    // É um objeto vazio mas do tipo AuthState
    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    // Armazenando o token e user no localstorage do browser
    localStorage.setItem('@GoBarber:token', token);
    // stringify - convertendo objeto ou valor em json
    localStorage.setItem('@GoBarber:user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:token');
    localStorage.removeItem('@GoBarber:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useauth must be used within an AuthProvider');
  }

  return context;
}
