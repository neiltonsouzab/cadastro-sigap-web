import React, { useState, useCallback } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Grid,
  ListItem,
  List,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  ListSubheader,
  Button,
  Divider,
  CircularProgress,
} from '@material-ui/core';
import {
  ArrowBack,
  Description,
  Delete,
  CloudUpload,
  GetApp,
  Send,
} from '@material-ui/icons';
import { Formik, Form, FastField, FieldProps } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { parse } from 'date-fns';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../../../../hooks/auth';
import { useToast } from '../../../../hooks/toast';
import useAPI from '../../../../hooks/api';

import InputSelect from '../../../../components/InputSelect';
import InputText from '../../../../components/InputText';
import InputMask from '../../../../components/InputMask';

const ugsTypes = [{ value: 'EMPRESA_PUBLICA', label: 'Empresa Pública' }];

interface MyFile extends File {
  uuid: string;
}

interface UgRegistration {
  type: string;
  ug_id: number | undefined;
  code: string;
  short_name: string;
  name: string;
  cnpj: string;
  fantasy_name: string;
  open_date: string;
  legal_nature_code: string;
  address: string;
  number: string;
  complement: string;
  district: string;
  cep: string;
  email: string;
  phone: string;
  site: string;
  obs: string;
  expense_ordinator_cpf: string;
  expense_ordinator_name: string;
  expense_ordinator_email: string;
}

const validationSchema = Yup.object({
  type: Yup.string().required('Tipo obrigatório.'),
  ug_id: Yup.number().required('UG obrigatória.'),
  code: Yup.string().required('Código obrigatório.'),
  short_name: Yup.string().required('SIGLA obrigatória.'),
  name: Yup.string().required('Nome obrigatório.'),
  cnpj: Yup.string().required('CNPJ obrigatório.'),
  fantasy_name: Yup.string().required('Nome fantasia obrigatório.'),
  open_date: Yup.string().required('Data de abertura obrigatório.'),
  legal_nature_code: Yup.string().required(
    'Código de natureza jurídica obrigatório.',
  ),
  address: Yup.string().required('Endereço obrigatório.'),
  number: Yup.string().required('Nº obrigatório.'),
  district: Yup.string().required('Bairro obrigatório.'),
  cep: Yup.string().required('CEP obrigatório.'),
  email: Yup.string().email('Email inválido.').required('Email obrigatório.'),
  phone: Yup.string().required('Telefone obrigatório'),
  expense_ordinator_cpf: Yup.string().required('CPF do ordenador obrigatório.'),
  expense_ordinator_name: Yup.string().required(
    'Nome do ordenador obrigatório.',
  ),
  expense_ordinator_email: Yup.string()
    .email('Email inválido.')
    .required('Email do ordenador obrigatório.'),
});

const Create: React.FC = () => {
  const history = useHistory();
  const api = useAPI();

  const { user } = useAuth();
  const { addToast } = useToast();

  const ugsAvaiables = user.ugs.map((ug) => ({
    value: ug.id,
    label: `${ug.code} - ${ug.name}`,
  }));

  const [ugFiles, setUgFiles] = useState<MyFile[]>([]);
  const [ordinatorFiles, setOrdinatorFiles] = useState<MyFile[]>([]);

  const handleAddUgFile = useCallback((files: FileList | null) => {
    if (files) {
      const file = files[0] as MyFile;
      file.uuid = uuidv4();

      setUgFiles((state) => [...state, file]);
    }
  }, []);

  const handleAddOrdinatorFile = useCallback((files: FileList | null) => {
    if (files) {
      const file = files[0] as MyFile;
      file.uuid = uuidv4();

      setOrdinatorFiles((state) => [...state, file]);
    }
  }, []);

  const handleRemoveUgFile = useCallback((uuid: string) => {
    setUgFiles((state) => state.filter((item) => item.uuid !== uuid));
  }, []);

  const handleRemoveOrdinatorFile = useCallback((uuid: string) => {
    setOrdinatorFiles((state) => state.filter((item) => item.uuid !== uuid));
  }, []);

  const handleSubmit = useCallback(
    async (data: UgRegistration) => {
      if (ugFiles.length === 0) {
        addToast({
          type: 'error',
          title: 'Algo deu errado!',
          description:
            'Adicione ao menos 1 documento de comprovação da unidade gestora.',
        });

        return;
      }

      if (ordinatorFiles.length === 0) {
        addToast({
          type: 'error',
          title: 'Algo deu errado!',
          description:
            'Adicione ao menos 1 documento de comprovação do ordenador.',
        });

        return;
      }

      const formData = new FormData();

      formData.append('type', data.type);
      formData.append('ug_id', String(data.ug_id));
      formData.append('code', String(data.code));
      formData.append('short_name', data.short_name);
      formData.append('name', data.name);
      formData.append('cnpj', data.cnpj);
      formData.append('fantasy_name', data.fantasy_name);
      formData.append(
        'open_date',
        parse(data.open_date, 'dd/MM/yyyy', new Date()).toISOString(),
      );
      formData.append('legal_nature_code', data.legal_nature_code);
      formData.append('address', data.address);
      formData.append('number', data.number);
      formData.append('complement', data.complement);
      formData.append('district', data.district);
      formData.append('cep', data.cep);
      formData.append('email', data.email);
      formData.append('phone', data.phone);
      formData.append('site', data.site);
      formData.append('obs', data.obs);
      formData.append('expense_ordinator_cpf', data.expense_ordinator_cpf);
      formData.append('expense_ordinator_name', data.expense_ordinator_name);
      formData.append('expense_ordinator_email', data.expense_ordinator_email);

      ugFiles.map((file) => formData.append('file1', file));
      ordinatorFiles.map((file) => formData.append('file2', file));

      await api.post('/ugs-registrations', formData);

      addToast({
        type: 'success',
        title: 'Deu tudo certo!',
        description: 'Registro enviado com sucesso.',
      });

      history.push('/ugs/registrations');
    },
    [history, addToast, ugFiles, ordinatorFiles, api],
  );

  const handleNavigateToUgRegistrationList = useCallback(() => {
    history.push('/ugs/registrations');
  }, [history]);

  return (
    <Formik
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      initialValues={{
        type: '',
        ug_id: undefined,
        code: '',
        short_name: '',
        name: '',
        cnpj: '',
        fantasy_name: '',
        open_date: '',
        legal_nature_code: '',
        address: '',
        number: '',
        complement: '',
        district: '',
        cep: '',
        email: '',
        phone: '',
        site: '',
        obs: '',
        expense_ordinator_cpf: '',
        expense_ordinator_name: '',
        expense_ordinator_email: '',
      }}
    >
      {({ isSubmitting, handleSubmit, ...rest }) => (
        <Form onSubmit={handleSubmit} {...rest}>
          <Box paddingX={4} paddingY={4}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <Typography variant="h4" color="textPrimary">
                  Registros de UG
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Enviar um novo registro para análise.
                </Typography>
              </Box>

              <Box display="flex" alignItems="center">
                <Box>
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    size="large"
                    startIcon={
                      isSubmitting ? <CircularProgress size={24} /> : <Send />
                    }
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'ENVIANDO' : 'ENVIAR'}
                  </Button>
                </Box>

                <Box marginLeft={2}>
                  <IconButton onClick={handleNavigateToUgRegistrationList}>
                    <ArrowBack fontSize="large" color="primary" />
                  </IconButton>
                </Box>
              </Box>
            </Box>

            <Box marginY={2}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <FastField name="type">
                    {({ field, meta }: FieldProps) => (
                      <InputSelect
                        required
                        label="Tipo de Unidade"
                        {...field}
                        errors={meta.error}
                        touched={meta.touched}
                        options={ugsTypes}
                      />
                    )}
                  </FastField>
                </Grid>

                <Grid item xs={12} md={8}>
                  <FastField name="ug_id">
                    {({ field, meta }: FieldProps) => (
                      <InputSelect
                        required
                        label="Unidade Gestora"
                        {...field}
                        errors={meta.error}
                        touched={meta.touched}
                        options={ugsAvaiables}
                      />
                    )}
                  </FastField>
                </Grid>

                <Grid item xs={12} md={2}>
                  <FastField name="code">
                    {({ field, meta }: FieldProps) => (
                      <InputText
                        required
                        label="Código"
                        {...field}
                        errors={meta.error}
                        touched={meta.touched}
                      />
                    )}
                  </FastField>
                </Grid>

                <Grid item xs={12} md={2}>
                  <FastField name="short_name">
                    {({ field, meta }: FieldProps) => (
                      <InputText
                        label="Sigla"
                        {...field}
                        errors={meta.error}
                        touched={meta.touched}
                      />
                    )}
                  </FastField>
                </Grid>

                <Grid item xs={12} md={8}>
                  <FastField name="name">
                    {({ field, meta }: FieldProps) => (
                      <InputText
                        required
                        label="Nome"
                        {...field}
                        errors={meta.error}
                        touched={meta.touched}
                      />
                    )}
                  </FastField>
                </Grid>

                <Grid item xs={12} md={4}>
                  <FastField name="cnpj">
                    {({ field, meta }: FieldProps) => (
                      <InputMask
                        required
                        label="CNPJ"
                        mask="99.999.999/9999-99"
                        {...field}
                        errors={meta.error}
                        touched={meta.touched}
                      />
                    )}
                  </FastField>
                </Grid>

                <Grid item xs={12} md={8}>
                  <FastField name="fantasy_name">
                    {({ field, meta }: FieldProps) => (
                      <InputText
                        required
                        label="Nome Fantasia"
                        {...field}
                        errors={meta.error}
                        touched={meta.touched}
                      />
                    )}
                  </FastField>
                </Grid>

                <Grid item xs={12} md={4}>
                  <FastField name="open_date">
                    {({ field, meta }: FieldProps) => (
                      <InputMask
                        required
                        mask="99/99/9999"
                        label="Data de Abertura"
                        {...field}
                        errors={meta.error}
                        touched={meta.touched}
                      />
                    )}
                  </FastField>
                </Grid>

                <Grid item xs={12} md={8}>
                  <FastField name="legal_nature_code">
                    {({ field, meta }: FieldProps) => (
                      <InputText
                        required
                        label="Código de Natureza Jurídica"
                        {...field}
                        errors={meta.error}
                        touched={meta.touched}
                      />
                    )}
                  </FastField>
                </Grid>

                <Grid item xs={12} md={8}>
                  <FastField name="address">
                    {({ field, meta }: FieldProps) => (
                      <InputText
                        required
                        label="Endereço"
                        {...field}
                        errors={meta.error}
                        touched={meta.touched}
                      />
                    )}
                  </FastField>
                </Grid>

                <Grid item xs={12} md={4}>
                  <FastField name="number">
                    {({ field, meta }: FieldProps) => (
                      <InputText
                        required
                        label="Nº"
                        {...field}
                        errors={meta.error}
                        touched={meta.touched}
                      />
                    )}
                  </FastField>
                </Grid>

                <Grid item xs={12} md={4}>
                  <FastField name="complement">
                    {({ field, meta }: FieldProps) => (
                      <InputText
                        label="Complemento"
                        {...field}
                        errors={meta.error}
                        touched={meta.touched}
                      />
                    )}
                  </FastField>
                </Grid>

                <Grid item xs={12} md={4}>
                  <FastField name="district">
                    {({ field, meta }: FieldProps) => (
                      <InputText
                        required
                        label="Bairro"
                        {...field}
                        errors={meta.error}
                        touched={meta.touched}
                      />
                    )}
                  </FastField>
                </Grid>

                <Grid item xs={12} md={4}>
                  <FastField name="cep">
                    {({ field, meta }: FieldProps) => (
                      <InputMask
                        required
                        mask="99999-999"
                        label="CEP"
                        {...field}
                        errors={meta.error}
                        touched={meta.touched}
                      />
                    )}
                  </FastField>
                </Grid>

                <Grid item xs={12} md={4}>
                  <FastField name="email">
                    {({ field, meta }: FieldProps) => (
                      <InputText
                        required
                        label="Email"
                        {...field}
                        errors={meta.error}
                        touched={meta.touched}
                      />
                    )}
                  </FastField>
                </Grid>

                <Grid item xs={12} md={4}>
                  <FastField name="phone">
                    {({ field, meta }: FieldProps) => (
                      <InputMask
                        required
                        mask="(99) 9999-9999"
                        label="Telefone"
                        {...field}
                        errors={meta.error}
                        touched={meta.touched}
                      />
                    )}
                  </FastField>
                </Grid>

                <Grid item xs={12} md={4}>
                  <FastField name="site">
                    {({ field, meta }: FieldProps) => (
                      <InputText
                        label="Site"
                        {...field}
                        errors={meta.error}
                        touched={meta.touched}
                      />
                    )}
                  </FastField>
                </Grid>

                <Grid item xs={12} md={12}>
                  <FastField name="obs">
                    {({ field, meta }: FieldProps) => (
                      <InputText
                        multiline
                        rows={4}
                        label="Observação"
                        {...field}
                        errors={meta.error}
                        touched={meta.touched}
                      />
                    )}
                  </FastField>
                </Grid>

                <Grid item xs={12} md={12}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box>
                      <Typography variant="body1">
                        Documentos da Unidade Gestora
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Adicione documentos que comprovem a criação da unidade.
                        (Lei de criação, Decretos, etc.)
                      </Typography>
                    </Box>
                  </Box>

                  <List style={{ margin: 0, padding: 0 }}>
                    <ListSubheader style={{ padding: 0 }}>
                      <input
                        id="input-ug-file"
                        type="file"
                        style={{ display: 'none' }}
                        onChange={(event) =>
                          handleAddUgFile(event.target.files)
                        }
                      />
                      <label htmlFor="input-ug-file">
                        <Button
                          variant="outlined"
                          color="primary"
                          startIcon={<CloudUpload />}
                          component="span"
                        >
                          ADICIONAR ARQUIVO
                        </Button>
                      </label>
                    </ListSubheader>

                    {ugFiles.map((ugFile) => (
                      <ListItem key={ugFile.uuid} style={{ paddingLeft: 0 }}>
                        <ListItemAvatar>
                          <Avatar>
                            <Description />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText color="primary" primary={ugFile.name} />
                        <ListItemSecondaryAction>
                          <IconButton
                            rel="noreferrer"
                            target="_blank"
                            href={URL.createObjectURL(ugFile)}
                          >
                            <GetApp color="primary" />
                          </IconButton>
                          <IconButton
                            onClick={() => handleRemoveUgFile(ugFile.uuid)}
                          >
                            <Delete color="error" />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>
            </Box>

            <Divider />

            <Box marginY={2}>
              <Typography variant="h6">Ordenador de Despesa</Typography>

              <Box marginTop={2}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <FastField name="expense_ordinator_cpf">
                      {({ field, meta }: FieldProps) => (
                        <InputMask
                          required
                          label="CPF"
                          mask="999.999.999-99"
                          {...field}
                          errors={meta.error}
                          touched={meta.touched}
                        />
                      )}
                    </FastField>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <FastField name="expense_ordinator_name">
                      {({ field, meta }: FieldProps) => (
                        <InputText
                          required
                          label="Nome"
                          {...field}
                          errors={meta.error}
                          touched={meta.touched}
                        />
                      )}
                    </FastField>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <FastField name="expense_ordinator_email">
                      {({ field, meta }: FieldProps) => (
                        <InputText
                          required
                          label="Email"
                          {...field}
                          errors={meta.error}
                          touched={meta.touched}
                        />
                      )}
                    </FastField>
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Box>
                        <Typography variant="body1">
                          Documentos do Ordenador
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Adicione documentos que comprovem a criação da
                          unidade. (Lei de criação, Decretos, etc.)
                        </Typography>
                      </Box>
                    </Box>

                    <List style={{ margin: 0, padding: 0 }}>
                      <ListSubheader style={{ padding: 0 }}>
                        <input
                          id="input-ordinator-file"
                          type="file"
                          style={{ display: 'none' }}
                          onChange={(event) =>
                            handleAddOrdinatorFile(event.target.files)
                          }
                        />
                        <label htmlFor="input-ordinator-file">
                          <Button
                            variant="outlined"
                            color="primary"
                            startIcon={<CloudUpload />}
                            component="span"
                          >
                            ADICIONAR ARQUIVO
                          </Button>
                        </label>
                      </ListSubheader>

                      {ordinatorFiles.map((ordinatorFile) => (
                        <ListItem
                          key={ordinatorFile.uuid}
                          style={{ paddingLeft: 0 }}
                        >
                          <ListItemAvatar>
                            <Avatar>
                              <Description />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            color="primary"
                            primary={ordinatorFile.name}
                          />
                          <ListItemSecondaryAction>
                            <IconButton
                              rel="noreferrer"
                              target="_blank"
                              href={URL.createObjectURL(ordinatorFile)}
                            >
                              <GetApp color="primary" />
                            </IconButton>
                            <IconButton
                              onClick={() =>
                                handleRemoveOrdinatorFile(ordinatorFile.uuid)
                              }
                            >
                              <Delete color="error" />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      ))}
                    </List>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default Create;
