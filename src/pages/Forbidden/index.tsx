import React from 'react';
import { Box, Typography, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const Forbidden: React.FC = () => {
  const history = useHistory();

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h1">403</Typography>
      <Typography variant="h6">Acesso não permitido</Typography>
      <Typography variant="body2" align="center" style={{ marginTop: 8 }}>
        A página que você esta tentando acessar não esta disponível para você.
        Se você acha que isso não deveria acontecer, entre em contato com a
        gente.
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

export default Forbidden;
