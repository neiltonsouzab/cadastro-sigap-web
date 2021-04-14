import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
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
  password: Yup.string().required('Nova senha obrigatória.'),
  password_confirmation: Yup.string().oneOf(
    [Yup.ref('password'), undefined],
    'Senhas não conferem',
  ),
});

const ResetPassword: React.FC = () => {
  const history = useHistory();
  const location = useLocation();

  const { addToast } = useToast();

  const formik = useFormik({
    validationSchema,
    initialValues: {
      password: '',
      password_confirmation: '',
    },
    onSubmit: async (data) => {
      try {
        const token = location.search.replace('?token=', '');

        if (!token) {
          addToast({
            type: 'error',
            title: 'Algo de errado aconteceu!',
            description: 'Token inexistente ou inválido.',
          });

          return;
        }

        await api.post('/password/reset', {
          password: data.password,
          password_confirmation: data.password_confirmation,
          token,
        });

        addToast({
          type: 'success',
          title: 'Deu tudo certo!',
          description: 'Sua senha foi alterada com sucesso.',
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
        Alteração de senha
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Informe uma nova senha para continuar
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
              label="Nova senha"
              name="password"
              required
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.password}
              errors={formik.errors.password}
            />
          </Grid>

          <Grid item>
            <InputText
              label="Confirmação de senha"
              name="password_confirmation"
              required
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.password_confirmation}
              errors={formik.errors.password_confirmation}
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

export default ResetPassword;
