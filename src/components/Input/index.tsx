import React, { InputHTMLAttributes, useEffect, useRef } from 'react';

import { IconBaseProps } from 'react-icons';
import { useField } from '@unform/core';
import { Container } from './styles';

/**
 * Utilizado para definir as propriedades a serem recebidas (similar a parâmetros em funçoes)
 * Cria interface com as propriedades dos elemento HTML
 * InputHTMLAttributes<HTMLInputElement> - possui os elemento HTML
 */
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  // Sobreescrevendo (name?: string) propriedade para tornar obrigatória
  name: string;
  // Receber componente como propriedade. Para seleção do icon
  // IconBaseProps possui a descrição das propriedade que podem ser recebidas por um icon
  // ?: - torna a propriedade opcional
  icon?: React.ComponentType<IconBaseProps>;
}

/**
 * <InputProps> - passando a propriedade permite acessar as propriedade HTML dentro da constante Input
 *
 * (props) - repassando as props para o elemento no Container
 *
 * icon: Icon - nome é modificado pois o react só reconhece o componente com inicial maiuscula (Icon)
 */
const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  const inputRef = useRef(null);
  // Utilização do unform para controle de formulário
  const { fieldName, defaultValue, error, registerField } = useField(name);

  // Quando o componente for exibido em tela será chamada a função registerField
  useEffect(() => {
    registerField({
      name: fieldName,
      // forma de acessar elemento diretamente sem precisar armazenar em algum estado
      // similar ao acesso da DOM. Ex: document.querySelector('input')
      ref: inputRef.current,
      // onde o unform vai buscar o valor da referência
      // Similar a manipulação da DOM: document.querySelector('input').value
      path: 'value',
    });
    // informa variáveis utilizadas no registerField
  }, [fieldName, registerField]);

  return (
    <Container>
      {/** Verificando se existe um Icon */}
      {Icon && <Icon size={20} />}
      {/** Associa a input ao inputRef */}
      {/** defaultValue={defaultValue} - para setar valor padrão
       * Deve colocar o valor no Form com a propriedade initialData{{name: 'Valor'}}
       */}
      <input defaultValue={defaultValue} ref={inputRef} {...rest} />
    </Container>
  );
};

export default Input;
