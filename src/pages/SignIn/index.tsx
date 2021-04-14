import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  Link,
  Typography,
} from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import InputMask from '../../components/InputMask';
import InputText from '../../components/InputText';

import { useAuth } from '../../hooks/auth';

const validationSchema = Yup.object({
  cpf: Yup.string().required('CPF obrigatório.'),
  password: Yup.string().required('Senha obrigatória.'),
});

const SignIn: React.FC = () => {
  const history = useHistory();
  const { signIn } = useAuth();

  const formik = useFormik({
    validationSchema,
    initialValues: {
      cpf: '',
      password: '',
    },
    onSubmit: async (data) => {
      await signIn({
        cpf: data.cpf,
        password: data.password,
      });

      history.push('/ugs/registrations');
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
        Login
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Faça login para acessar o sistema
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
            <InputMask
              label="CPF"
              name="cpf"
              required
              mask="999.999.999-99"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.cpf}
              errors={formik.errors.cpf}
            />
          </Grid>

          <Grid item>
            <InputText
              label="Senha"
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
            <Button
              type="submit"
              size="large"
              variant="contained"
              color="primary"
              fullWidth
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? <CircularProgress size={24} /> : 'ENTRAR'}
            </Button>
          </Grid>

          <Link
            component="button"
            variant="body2"
            onClick={() => history.push('/forgot-password')}
          >
            Esqueci minha senha
          </Link>
        </Grid>
      </Box>
    </Box>
  );
};

export default SignIn;
