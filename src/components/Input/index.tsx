import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';

import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';
import { Container, Error } from './styles';

// Componente para exibição das mensagens
// import Tooltip from '../Tooltip';

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
  // Permite acessar os dados do input
  // HTMLInputElement - identifica que a referencia armazenada é de um input e permite acessa as propriedades através do IntelliSense
  const inputRef = useRef<HTMLInputElement>(null);
  // Para verificar o estado de focus do input
  const [isFocused, setIsFocused] = useState(false);
  // Para verificar o estado de preenchimento do input
  const [isFilled, setIsFilled] = useState(false);

  // Utilização do unform para controle de formulário
  const { fieldName, defaultValue, error, registerField } = useField(name);

  // Função que não é recriada nas renderizações do componente
  // Função só é recriada quando alguma das variáveis do segundo parâmetro forem alteradas
  // Se não houver variáveis não haverá recriação
  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    // inputRef.current?.value - interrogação é para verificar se existe algo para ser verificado
    setIsFilled(!!inputRef.current?.value);
  }, []);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

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
    // disparam a função novamente se alguma dessas variáveis for modificada
  }, [fieldName, registerField]);

  return (
    /**
     * isFocused={isFocused} - propriedade monitorada para disparo da função setIsFocused
     * isFilled={isFilled} - propriedade monitorada para disparo da função setIsFocused
     * A propriedade isFocused foi adicionada dentro do style do index.tsx através de uma interface
     * */
    <Container isErrored={!!error} isFilled={isFilled} isFocused={isFocused}>
      {/** Verificando se existe um Icon */}
      {Icon && <Icon size={20} />}
      {/** Associa a input ao inputRef */}
      {/** defaultValue={defaultValue} - para setar valor padrão
       * Deve colocar o valor no Form com a propriedade initialData{{name: 'Valor'}}
       */}
      {/**
       * Não utilizar esse formato - setIsFocused(true)
       * onFocus - função para ser chamada deve ser passada daquela forma para não executar quando a página for renderizada
       * onBlur - função para ser chamada deve ser passada daquela forma para não executar quando a página for renderizada
       */}
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />

      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Input;
