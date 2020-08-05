import React from 'react';
/**
 * Switch - garante que somente uma rota seja mostrada por vez
 * Route - indica cada rota existente da aplicação (utilizado dentro do componente criado Route)
 */
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SingUp from '../pages/SignUp';

import Dashboard from '../pages/Dashboard';

const Routes: React.FC = () => (
  <Switch>
    {/** exact - ao invés de procurar as rota que contenham '/' será procurado a exata */}
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SingUp} />

    <Route path="/dashboard" component={Dashboard} isPrivate />
  </Switch>
);

export default Routes;
