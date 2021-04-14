import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Box,
  Grid,
  Typography,
  Button,
  IconButton,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  CircularProgress,
} from '@material-ui/core';
import { Save, ArrowBack } from '@material-ui/icons';
import { Formik, Form, Field, FieldProps } from 'formik';
import * as Yup from 'yup';

import InputText from '../../../components/InputText';
import InputSelect from '../../../components/InputSelect';
import InputMask from '../../../components/InputMask';

import { useToast } from '../../../hooks/toast';
import useAPI from '../../../hooks/api';
import { Ug } from '../../../models';

interface UgCheckbox {
  value: number;
  label: string;
  checked: boolean;
}

const userTypes = [
  { value: 'ADMINISTRATOR', label: 'Administrador' },
  { value: 'ACCOUNTANT', label: 'Contador' },
  { value: 'OPERATOR', label: 'Operador' },
];

const validationSchema = Yup.object({
  type: Yup.string().required('Tipo obrigatório.'),
  name: Yup.string().required('Nome obrigatório.'),
  nickname: Yup.string().required('Apelido obrigatório.'),
  email: Yup.string().email('Email inválido.').required('Email obrigatório.'),
  cpf: Yup.string().required('CPF obrigatório.'),
});

const Create: React.FC = () => {
  const history = useHistory();
  const { addToast } = useToast();

  const api = useAPI();

  const [ugsCheckbox, setUgsCheckbox] = useState<UgCheckbox[]>([]);

  useEffect(() => {
    const loadUgs = async (): Promise<void> => {
      const response = await api.get<Ug[]>('/ugs');

      const data = response.data.map((item) => ({
        value: item.id,
        label: `${item.code} - ${item.short_name}`,
        checked: false,
      }));

      setUgsCheckbox(data);
    };

    loadUgs();
  }, [api]);

  const handleToggleSelectUg = useCallback(
    (value: number, checked: boolean) => {
      setUgsCheckbox((state) =>
        state.map((item) => {
          if (item.value === value) {
            return {
              ...item,
              checked,
            };
          }

          return item;
        }),
      );
    },

    [],
  );

  const handleToggleSelectAllUgs = useCallback((checked: boolean) => {
    setUgsCheckbox((state) => state.map((item) => ({ ...item, checked })));
  }, []);

  const isAllUgsSelected = useMemo(() => {
    return ugsCheckbox.reduce((result, item) => {
      if (!item.checked) {
        result = false;
      }

      return result;
    }, true);
  }, [ugsCheckbox]);

  const handleSubmit = useCallback(
    async (data) => {
      const ugs = ugsCheckbox
        .filter((item) => item.checked)
        .map((item) => ({ id: item.value }));

      const response = await api.post('/users', {
        ...data,
        ugs,
      });

      addToast({
        type: 'success',
        title: 'Deu tudo certo!',
        description: 'O usário foi salvo com sucesso.',
      });

      history.push(`/users/${response.data.id}`);
    },
    [ugsCheckbox, addToast, history, api],
  );

  const handleNavigateToUserList = useCallback(() => {
    history.push('/users');
  }, [history]);

  return (
    <Box paddingY={4} paddingX={4}>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          type: '',
          name: '',
          nickname: '',
          cpf: '',
          email: '',
        }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <Typography variant="h4" color="textPrimary">
                  Usuários
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Criação de um novo usuário
                </Typography>
              </Box>

              <Box display="flex" alignItems="center">
                <Box>
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    size="large"
                    disabled={isSubmitting}
                    startIcon={
                      isSubmitting ? (
                        <CircularProgress size={16} color="inherit" />
                      ) : (
                        <Save />
                      )
                    }
                  >
                    SALVAR
                  </Button>
                </Box>

                <Box marginLeft={2}>
                  <IconButton onClick={handleNavigateToUserList}>
                    <ArrowBack fontSize="large" color="primary" />
                  </IconButton>
                </Box>
              </Box>
            </Box>

            <Box marginTop={4}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Field name="type">
                    {({ field, meta }: FieldProps) => (
                      <InputSelect
                        label="Tipo"
                        {...field}
                        options={userTypes}
                        errors={meta.error}
                        touched={meta.touched}
                      />
                    )}
                  </Field>
                </Grid>

                <Grid item xs={12} md={8}>
                  <Field name="name">
                    {({ field, meta }: FieldProps) => (
                      <InputText
                        label="Nome"
                        {...field}
                        errors={meta.error}
                        touched={meta.touched}
                      />
                    )}
                  </Field>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Field name="nickname">
                    {({ field, meta }: FieldProps) => (
                      <InputText
                        label="Apelido"
                        {...field}
                        errors={meta.error}
                        touched={meta.touched}
                      />
                    )}
                  </Field>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Field name="cpf">
                    {({ field, meta }: FieldProps) => (
                      <InputMask
                        label="CPF"
                        mask="999.999.999-99"
                        {...field}
                        errors={meta.error}
                        touched={meta.touched}
                      />
                    )}
                  </Field>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Field name="email">
                    {({ field, meta }: FieldProps) => (
                      <InputText
                        label="Email"
                        {...field}
                        errors={meta.error}
                        touched={meta.touched}
                      />
                    )}
                  </Field>
                </Grid>
              </Grid>
            </Box>
          </Form>
        )}
      </Formik>

      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={12}>
          <FormControl component="fieldset" fullWidth error={true}>
            <FormLabel component="legend" error={true}>
              <Typography variant="body1" color="textPrimary">
                Unidades gestoras *
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Selecione as unidades gestoras que estarão disponíveis para o
                usuário.
              </Typography>
            </FormLabel>

            <FormControlLabel
              control={
                <Checkbox
                  checked={isAllUgsSelected}
                  onChange={(event, checked) =>
                    handleToggleSelectAllUgs(checked)
                  }
                />
              }
              label="Selecionar todas"
            />

            <FormGroup>
              <Grid container spacing={2}>
                {ugsCheckbox.map((item) => (
                  <Grid key={item.value} item xs={6} md={4} lg={3}>
                    <FormControlLabel
                      label={item.label}
                      control={
                        <Checkbox
                          checked={item.checked}
                          onChange={(_, checked) =>
                            handleToggleSelectUg(item.value, checked)
                          }
                        />
                      }
                    />
                  </Grid>
                ))}
              </Grid>
            </FormGroup>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Create;
