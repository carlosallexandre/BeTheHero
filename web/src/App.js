import React from 'react';
import { ToastContainer } from 'react-toastify';

import GlobalStyles from './styles/global';

import Routes from './routes';

function App() {
  return (
    <>
      <Routes />
      <GlobalStyles />
      <ToastContainer autoClose={3000} />
    </>
  );
}

export default App;
