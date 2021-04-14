import React, { useContext } from 'react';

import { createContext, useCallback, useState } from 'react';

import useAPI from '../hooks/api';

// import api from '../services/api';
import { User } from '../models';

interface SignInCredentials {
  cpf: string;
  password: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const api = useAPI();

  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@cadastro-sigap:token');
    const user = localStorage.getItem('@cadastro-sigap:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return {
        token,
        user: JSON.parse(user),
      };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(
    async ({ cpf, password }: SignInCredentials) => {
      const response = await api.post('/sessions', {
        cpf,
        password,
      });

      const { user, token } = response.data;

      localStorage.setItem('@cadastro-sigap:token', token);
      localStorage.setItem('@cadastro-sigap:user', JSON.stringify(user));

      api.defaults.headers.authorization = `Bearer ${token}`;

      setData({
        user,
        token,
      });
    },
    [api],
  );

  const signOut = useCallback(async () => {
    localStorage.removeItem('@cadastro-sigap:token');
    localStorage.removeItem('@cadastro-sigap:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
