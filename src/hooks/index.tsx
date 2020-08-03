import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';

/** Componente para armazenar todos os contexto que serão utilizados no App */
const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ToastProvider>{children}</ToastProvider>
  </AuthProvider>
);

export default AppProvider;
