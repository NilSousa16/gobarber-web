import React, { useRef, useCallback } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

const SingIn: React.FC = () => {
  // useRef - Para acesso direto aos dados do formulário
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
        password: Yup.string().required('Senha obrigatória'),
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
      <Content>
        <img src={logoImg} alt="GoBarber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu logon</h1>

          <Input name="email" icon={FiMail} placeholder="E-mail" />

          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />

          <Button type="submit">Entrar</Button>

          <a href="forgot">Esqueci minha senha</a>
        </Form>

        <a href="login">
          <FiLogIn />
          Criar conta
        </a>
      </Content>
      <Background />
    </Container>
  );
};

export default SingIn;
