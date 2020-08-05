import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

import signUpBackgroundImg from '../../assets/sign-up-background.png';

export const Container = styled.div`
  /* vh - 100% da área visível */
  height: 100vh;

  display: flex;
  /* faz os itens ocuparem todo o espaç com height 100vh */
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  /* alinha elementos do conteúdo ao centro na horizontal/vertical */
  place-content: center;

  width: 100%;
  max-width: 700px;
`;

/** Animação com keyframes */
const appearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to{
    opacity: 1;
    transform: trasnlateX(0);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  /** Execução da animação */
  animation: ${appearFromRight} 1s;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }

  /* estiliza apenas os 'as' que estão na raiz do content */
  > a {
    color: #ff9000;
    display: block;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, '#ff9000')};
    }
  }
`;

export const Background = styled.div`
  /* Ocupa todo o espaço menos os de outros elementos */
  flex: 1;
  background: url(${signUpBackgroundImg}) no-repeat center;
  /* Cobrir todo o espaço da div */
  background-size: cover;
`;
