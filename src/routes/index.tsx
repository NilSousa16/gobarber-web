import React from 'react';
/**
 * Switch - garante que somente uma rota seja mostrada por vez
 * Route - indica cada rota existente da aplicação (utilizado dentro do componente criado Route)
 */
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../Pages/SignIn';
import SingUp from '../Pages/SignUp';

import Dashboard from '../Pages/Dashboard';

const Routes: React.FC = () => (
  <Switch>
    {/** exact - ao invés de procurar as rota que contenham '/' será procurado a exata */}
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SingUp} />

    <Route path="/dashboard" component={Dashboard} isPrivate />
  </Switch>
);

export default Routes;
