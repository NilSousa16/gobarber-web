import React from 'react';

import GlobalStyle from './styles/global';

import SignIn from './Pages/SignIn';
// import SignUp from './Pages/SignUp';
// import AuthContext from './context/AuthContext';

import { AuthProvider } from './hooks/AuthContext';

const App: React.FC = () => (
  <>
    {/** Toda informação do provide passada ao value fica acessível para o SignIn ou qualquer outro componente dentro de AuthContext.Provider */}
    <AuthProvider>
      <SignIn />
    </AuthProvider>

    <GlobalStyle />
  </>
);

export default App;
