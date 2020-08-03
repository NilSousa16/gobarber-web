import React from 'react';
import { useTransition } from 'react-spring';

import Toast from './Toast';

import { ToastMessage } from '../../hooks/toast';
import { Container } from './styles';

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  /**
   * Utilizado para realizar as transições animadas das mensagens de toast
   */
  const messagesWithTransitions = useTransition(
    // Conteúdo a ser animado
    messages,
    // Função que retorna a chave da mensagem
    message => message.id,
    /**
     * Objeto com as animações
     * Antes de aparece / durante a aparição / saída do objeto
     */
    {
      from: { right: '-120%', opacity: 0 },
      enter: { right: '0%', opacity: 1 },
      leave: { right: '-120%', opacity: 0 },
    },
  );

  return (
    <Container>
      {/** Map para mostrar as mensagens */}
      {/** Toast sem animação
      {messages.map(message => (
        <Toast key={message.id} message={message} />
      ))}
      */}
      {/** Toast com animação */}
      {messagesWithTransitions.map(({ item, key, props }) => (
        <Toast key={key} style={props} message={item} />
      ))}
    </Container>
  );
};

export default ToastContainer;
