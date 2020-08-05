import React from 'react';
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMProps,
  Redirect /** Para redirecionamento de página */,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

/** Adiciona as propriedades do RouteProps a interface criada */
interface RouteProps extends ReactDOMProps {
  isPrivate?: boolean;
  /** Sobreescrevendo propriedade para receber componentes no formado 'Dashboard' e não <Dashboard /> */
  component: React.ComponentType;
}

/** RouteProps - todas as propriedades recebidas */
const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  /** Se houver algo na variável significa que há usuário autenticado */
  const { user } = useAuth();

  /** Repassando as propriedade ...rest para o componente
    render - para modificar a lógica de renderização dos componentes
    Verificação do Redirect vê se a rota é privada então redireciona para login ou dashboard
    location - para não perder a navegação
  */
  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
