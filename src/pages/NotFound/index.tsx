import React from 'react';
import { Box, Typography, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const NotFound: React.FC = () => {
  const history = useHistory();

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h1">404</Typography>
      <Typography variant="h6">Página não encontrada</Typography>
      <Typography variant="body2" align="center" style={{ marginTop: 8 }}>
        A página que você esta tentando acessar não existe. Verifique se o
        endereço está correto e tente novamente
      </Typography>

      <Button
        variant="outlined"
        style={{ marginTop: 16 }}
        onClick={() => history.go(-2)}
      >
        Voltar
      </Button>
    </Box>
  );
};

export default NotFound;
