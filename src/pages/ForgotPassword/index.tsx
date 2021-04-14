import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Button,
  Link,
  Divider,
  CircularProgress,
} from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import api from '../../services/api';
import { useToast } from '../../hooks/toast';

import InputText from '../../components/InputText';

const validationSchema = Yup.object({
  email: Yup.string().email('Email inválido.').required('Email obrigatório.'),
});

const ForgotPassword: React.FC = () => {
  const history = useHistory();

  const { addToast } = useToast();

  const formik = useFormik({
    validationSchema,
    initialValues: {
      email: '',
    },
    onSubmit: async (data) => {
      try {
        await api.post('/password/forgot', {
          email: data.email,
        });

        addToast({
          type: 'success',
          title: 'Deu tudo certo!',
          description:
            'Foi enviado para o email informado instruções par alteração de senha.',
        });

        history.push('/');
      } catch (error) {
        const errorResponse = error.response;

        if (errorResponse.status === 404 || errorResponse.status === 400) {
          addToast({
            type: 'error',
            title: 'Algo de errado aconteceu!',
            description: errorResponse.data.message as string,
          });

          return;
        }

        addToast({
          type: 'error',
          title: 'Algo de errado aconteceu!',
          description:
            'Não conseguimos processar sua requisição, tente novamente.',
        });

        return;
      }
    },
  });

  return (
    <Box
      component="div"
      flex={1}
      maxWidth={400}
      paddingY={4}
      paddingX={4}
      boxShadow="0 0 20px rgb(0 0 0 / 5%)"
      bgcolor="#FFF"
    >
      <Typography variant="h6" color="textPrimary">
        Esqueci minha senha
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Insira seu email para alterar sua senha
      </Typography>

      <Box marginY={2}>
        <Divider />
      </Box>

      <Box
        component="form"
        marginTop={2}
        onSubmit={(event) => {
          event.preventDefault();
          formik.handleSubmit();
        }}
      >
        <Grid container spacing={2} direction="column">
          <Grid item>
            <InputText
              label="Email"
              name="email"
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.email}
              errors={formik.errors.email}
            />
          </Grid>

          <Grid item>
            <Button
              type="submit"
              size="large"
              variant="contained"
              color="primary"
              fullWidth
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? <CircularProgress size={24} /> : 'ENVIAR'}
            </Button>
          </Grid>

          <Link
            component="button"
            variant="body2"
            onClick={() => history.push('/')}
          >
            Voltar para login
          </Link>
        </Grid>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
