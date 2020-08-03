import React from 'react';

import GlobalStyle from './styles/global';

import SignIn from './Pages/SignIn';
// import SignUp from './Pages/SignUp';
// import AuthContext from './context/AuthContext';

import AppProvider from './hooks';

const App: React.FC = () => (
  <>
    {/** Toda informação do provide passada ao value fica acessível para o SignIn ou qualquer outro componente dentro de AuthContext.Provider */}
    <AppProvider>
      <SignIn />
    </AppProvider>

    <GlobalStyle />
  </>
);

export default App;
