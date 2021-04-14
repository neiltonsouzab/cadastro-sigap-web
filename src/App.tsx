import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core';

import Routes from './routes';
import AppProvider from './hooks';

import theme from './styles/theme';

const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppProvider>
          <Routes />
        </AppProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
