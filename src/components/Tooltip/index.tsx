import React from 'react';

import { Container } from './styles';

interface TooltipProps {
  title: string;
  /**
   * Permite que o  Tooltip receba a estilização quando
   * informado ao styles que será estilizado um Tooltip
   * */
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ title, className, children }) => {
  return (
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
  );
};

export default Tooltip;
