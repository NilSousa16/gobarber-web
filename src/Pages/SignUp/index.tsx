import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
// Tipagem do unform
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
// Importa tudo do yup dentro de uma váriavel Yup
import * as Yup from 'yup';
// Função para lidar com o formato dos erros
import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

const SingUp: React.FC = () => {
  // useRef - Para acesso direto aos dados do formulário
  // FormHandles - Para acesso a tipagem
  const formRef = useRef<FormHandles>(null);

  // Lida com o submit e recebe como parâmetro os dados do formulário
  const handleSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({});
      /**
       * object() - tipo que será validado
       * shape - defini valildação
       */
      const schema = Yup.object().shape({
        // <Campo a ser validado>: Yup.<tipo>.<validação>.<validação>
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().min(6, 'No mínimo 6 dígitos'),
      });
      // Realizando a validação
      await schema.validate(data, {
        /** Faz com que seja retornado
         * todos os erros de validação e
         * não somente o primeiro encontrado */
        abortEarly: false,
      });
    } catch (err) {
      // Erros capturados
      const errors = getValidationErrors(err);

      formRef.current?.setErrors(errors);
    }
  }, []);

  return (
    <Container>
      <Background />
      <Content>
        <img src={logoImg} alt="GoBarber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu cadastro</h1>

          <Input name="name" icon={FiUser} placeholder="Nome" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />

          <Input
            name="password"
            type="password"
            icon={FiLock}
            placeholder="Senha"
          />

          <Button type="submit">Cadastrar</Button>
        </Form>

        <a href="login">
          <FiArrowLeft />
          Voltar para logon
        </a>
      </Content>
    </Container>
  );
};

export default SingUp;
