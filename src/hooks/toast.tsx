import React, { createContext, useCallback, useContext, useState } from 'react';

import { uuid } from 'uuidv4';

import ToastContainer from '../components/ToastContainer';

// Exportando interface para reaproveitar
export interface ToastMessage {
  id: string;
  // ? - paramêtro opcional
  type?: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

interface ToastContextData {
  addToast(message: Omit<ToastMessage, 'id'>): void;
  removeToast(id: string): void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider: React.FC = ({ children }) => {
  // Armazenar mensagens de toast
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  // Omit<ToastMessage, 'id'> - tipo será ToastMessage menos o atributo id
  const addToast = useCallback(
    ({ type, title, description }: Omit<ToastMessage, 'id'>) => {
      const id = uuid();

      const toast = {
        id,
        type,
        title,
        description,
      };

      // Outra forma de preencher o estado
      // Como estou usado o valor anterior do posso recebê-lo como paramêtro, no caso state
      setMessages(state => [...state, toast]);
    },
    [],
  );

  const removeToast = useCallback((id: string) => {
    // Retorna todas as mensagem, exceto a que possui o id repassado
    setMessages(state => state.filter(message => message.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
};

function useToast(): ToastContextData {
  const context = useContext(ToastContext);
  /** Caso o useToast não seja usado dentro de um  ToastProvider */
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
}

export { ToastProvider, useToast };
