import { Box } from '@material-ui/core';
import React from 'react';

import cpa from '../../../assets/cpa.jpg';

const AuthLayout: React.FC = ({ children }) => {
  return (
    <Box component="main" display="flex" width="100vw" height="100vh">
      <Box
        component="section"
        flex={1}
        paddingX={4}
        paddingY={4}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {children}
      </Box>

      <Box
        component="section"
        width="50%"
        boxShadow="inset 124px 0px 50px #F7FAFC"
        style={{
          background: `url(${cpa}) center center`,
        }}
      />
    </Box>
  );
};

export default AuthLayout;
