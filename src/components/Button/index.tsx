import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

/**
 * Cria interface com as propriedades dos elemento HTML
 * ButtonHTMLAttributes<HTMLButtonElement> - possui os elemento HTML
 *
 * interface ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>{} - por não ter nenhuma propriedade adicionada o eslint reescreve o ButtonProps na sua forma mais reduzida como um 'type'
 */
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * <ButtonProps> - passando a propriedade permite acessar as propriedade HTML dentro da constante Button
 *
 * (props) - repassando as props para o elemento no button
 *
 * { children, ...rest } - desentruturação da props para pegar o título adicionado ao button e o resto das propriedades estão sendo passadas como rest. (..., serve para copiar os demais elementos)
 */
const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <Container type="button" {...rest}>
    {children}
  </Container>
);

export default Button;
