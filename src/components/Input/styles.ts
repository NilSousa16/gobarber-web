import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #232129;
  border-radius: 10px;
  padding: 16px;
  width: 100%;

  border: 2px solid #232129;
  color: #666360;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  /**
  * Os props do css vão receber a configuração se o isFocused for true
  * css - utilizado para escrever css em uma função no typescript
   */
  ${props =>
    props.isFocused &&
    css`
      color: #ff9000;
      border-color: #ff9000;
    `}

  /**
  * Os props do css vão receber a configuração se o isFocused for true
  * css - utilizado para escrever css em uma função no typescript
   */
  ${props =>
    props.isFilled &&
    css`
      color: #ff9000;
    `}

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #f4ede8;

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

// Uso o componente que criei e estilizo ele
export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  /** Sobreescreve a cor padrão para o Tooltip */
  span {
    background: #c53030;
    color: #fff;

    /** Foi necessário estilizar totalmente o componente para funcionar */
    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
