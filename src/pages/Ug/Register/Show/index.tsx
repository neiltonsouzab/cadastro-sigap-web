import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  Box,
  Typography,
  IconButton,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Tooltip,
  makeStyles,
  createStyles,
  Theme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Chip,
  CircularProgress,
  Link,
} from '@material-ui/core';
import {
  ArrowBack,
  Description,
  GetApp,
  CheckCircle,
  Cancel,
} from '@material-ui/icons';
import { format, parseISO } from 'date-fns';
import { Formik, Form, Field, FieldProps } from 'formik';
import * as Yup from 'yup';

import InputText from '../../../../components/InputText';
import { useToast } from '../../../../hooks/toast';
import { useAuth } from '../../../../hooks/auth';
import useAPI from '../../../../hooks/api';
import { UgRegistration, File } from '../../../../models';

import Skeleton from './Skeleton';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    iconSuccess: {
      color: theme.palette.success.main,
    },
    iconDanger: {
      color: theme.palette.error.main,
    },
    chipSuccess: {
      backgroundColor: theme.palette.success.main,
      color: '#FFF',
    },
    chipDanger: {
      backgroundColor: theme.palette.error.main,
      color: '#FFF',
    },
    chipDefault: {
      backgroundColor: theme.palette.primary.main,
      color: '#FFF',
    },
  }),
);

interface RouteParams {
  id: number;
}

interface RefusalData {
  status_justification: string;
}

const validationSchema = Yup.object({
  status_justification: Yup.string().required(
    'Você deve justificar o motivo da recusa.',
  ),
});

const Show: React.FC = () => {
  const styles = useStyles();
  const params = useParams();
  const history = useHistory();
  const { addToast } = useToast();
  const { user } = useAuth();
  const api = useAPI();

  const { id } = params as RouteParams;

  const statusStyles = {
    ANALISE: styles.chipDefault,
    RECUSADO: styles.chipDanger,
    APROVADO: styles.chipSuccess,
  };

  const [ugRegistration, setUgRegistration] = useState<UgRegistration>();
  const [ugFiles, setUgFiles] = useState<File[]>([]);
  const [ordinatorFiles, setOrdinatorFiles] = useState<File[]>([]);

  const [loadingApproval, setLoadingApproval] = useState(false);

  const [openApprovalDialog, setOpenApprovalDialog] = useState(false);
  const [openRefusalDialog, setOpenRefusalDialog] = useState(false);
  const [openJustificationDialog, setOpenJustificationDialog] = useState(false);

  useEffect(() => {
    const loadUgRegistration = async (): Promise<void> => {
      const { data } = await api.get<UgRegistration>(
        `/ugs-registrations/${id}`,
      );

      setUgFiles(data.files.filter((file) => file.from === 'ug'));
      setOrdinatorFiles(data.files.filter((file) => file.from === 'ordinator'));

      setUgRegistration({
        ...data,
        open_date: format(parseISO(data.open_date), 'dd/MM/yyyy'),
        updated_at: format(parseISO(data.updated_at), 'dd/MM/yyyy HH:mm:ss'),
      });
    };

    loadUgRegistration();
  }, [id, api]);

  const handleAprroval = useCallback(async () => {
    setLoadingApproval(true);

    const { data } = await api.put<UgRegistration>(`/ugs-registrations/${id}`, {
      status: 'APROVADO',
      status_justification: 'Sem justificativa.',
    });

    setUgRegistration({
      ...data,
      open_date: format(parseISO(data.open_date), 'dd/MM/yyyy'),
      updated_at: format(parseISO(data.updated_at), 'dd/MM/yyyy HH:mm:ss'),
    });

    setLoadingApproval(false);
    setOpenApprovalDialog(false);

    addToast({
      type: 'success',
      title: 'Deu tudo certo!',
      description: 'O registro foi aprovado com sucesso!',
    });
  }, [id, addToast, api]);

  const handleRefusal = useCallback(
    async ({ status_justification }: RefusalData) => {
      const { data } = await api.put<UgRegistration>(
        `/ugs-registrations/${id}`,
        {
          status: 'RECUSADO',
          status_justification,
        },
      );

      setUgRegistration({
        ...data,
        open_date: format(parseISO(data.open_date), 'dd/MM/yyyy'),
        updated_at: format(parseISO(data.updated_at), 'dd/MM/yyyy HH:mm:ss'),
      });

      setOpenRefusalDialog(false);

      addToast({
        type: 'success',
        title: 'Deu tudo certo!',
        description: 'O registro foi recusado com sucesso!',
      });
    },
    [id, addToast, api],
  );

  const handleNavigateToUgRegistrationList = useCallback(() => {
    history.push('/ugs/registrations');
  }, [history]);

  if (!ugRegistration) {
    return <Skeleton />;
  }

  return (
    <Box paddingX={4} paddingY={4}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography variant="h4" color="textPrimary">
            Registros de UG
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Visualização de registro enviado.
          </Typography>
        </Box>

        <Box display="flex" flexDirection="column" alignItems="flex-end">
          <Box>
            <Chip
              label={ugRegistration.status}
              className={statusStyles[ugRegistration.status]}
            />

            {ugRegistration.status === 'ANALISE' &&
              (user.type === 'ADMINISTRATOR' || user.type === 'OPERATOR') && (
                <>
                  <Tooltip title="Aprovar">
                    <IconButton onClick={() => setOpenApprovalDialog(true)}>
                      <CheckCircle
                        fontSize="large"
                        className={styles.iconSuccess}
                      />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Recusar">
                    <IconButton onClick={() => setOpenRefusalDialog(true)}>
                      <Cancel fontSize="large" className={styles.iconDanger} />
                    </IconButton>
                  </Tooltip>
                </>
              )}

            <IconButton onClick={handleNavigateToUgRegistrationList}>
              <ArrowBack fontSize="large" color="primary" />
            </IconButton>
          </Box>

          {ugRegistration.status !== 'ANALISE' && (
            <Box display="flex" flexDirection="column" alignItems="flex-end">
              <Typography variant="body2" color="textSecondary">
                Analisado por {ugRegistration.user.nickname} em{' '}
                {ugRegistration.updated_at}
              </Typography>

              {ugRegistration.status === 'RECUSADO' && (
                <Link
                  component="button"
                  variant="body2"
                  color="secondary"
                  onClick={() => setOpenJustificationDialog(true)}
                >
                  Ver justificativa
                </Link>
              )}
            </Box>
          )}
        </Box>
      </Box>

      <Box marginY={4}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <InputText
              InputProps={{
                readOnly: true,
              }}
              label="Tipo de Unidade"
              defaultValue="Empresa Pública"
            />
          </Grid>

          <Grid item xs={12} md={8}>
            <InputText
              InputProps={{
                readOnly: true,
              }}
              label="Unidade Gestora"
              defaultValue={`${ugRegistration.ug.code} - ${ugRegistration.ug.name}`}
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <InputText
              InputProps={{
                readOnly: true,
              }}
              label="Código"
              defaultValue={ugRegistration.code}
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <InputText
              InputProps={{
                readOnly: true,
              }}
              label="Sigla"
              defaultValue={ugRegistration.short_name}
            />
          </Grid>

          <Grid item xs={12} md={8}>
            <InputText
              InputProps={{
                readOnly: true,
              }}
              label="Nome"
              defaultValue={ugRegistration.name}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <InputText
              InputProps={{
                readOnly: true,
              }}
              label="CNPJ"
              defaultValue={ugRegistration.cnpj}
            />
          </Grid>

          <Grid item xs={12} md={8}>
            <InputText
              InputProps={{
                readOnly: true,
              }}
              label="Nome Fantasia"
              defaultValue={ugRegistration.fantasy_name}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <InputText
              InputProps={{
                readOnly: true,
              }}
              label="Data de Abertura"
              defaultValue={ugRegistration.open_date}
            />
          </Grid>

          <Grid item xs={12} md={8}>
            <InputText
              InputProps={{
                readOnly: true,
              }}
              label="Código de Natureza Jurídica"
              defaultValue={ugRegistration.legal_nature_code}
            />
          </Grid>

          <Grid item xs={12} md={8}>
            <InputText
              InputProps={{
                readOnly: true,
              }}
              label="Endereço"
              defaultValue={ugRegistration.address}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <InputText
              InputProps={{
                readOnly: true,
              }}
              label="Nº"
              defaultValue={ugRegistration.number}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <InputText
              InputProps={{
                readOnly: true,
              }}
              label="Complemento"
              defaultValue={ugRegistration.complement}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <InputText
              InputProps={{
                readOnly: true,
              }}
              label="Bairro"
              defaultValue={ugRegistration.district}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <InputText
              InputProps={{
                readOnly: true,
              }}
              label="CEP"
              defaultValue={ugRegistration.cep}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <InputText
              InputProps={{
                readOnly: true,
              }}
              label="Email"
              defaultValue={ugRegistration.email}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <InputText
              InputProps={{
                readOnly: true,
              }}
              label="Telefone"
              defaultValue={ugRegistration.phone}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <InputText
              InputProps={{
                readOnly: true,
              }}
              label="Site"
              defaultValue={ugRegistration.site}
            />
          </Grid>

          <Grid item xs={12} md={12}>
            <InputText
              InputProps={{
                readOnly: true,
              }}
              multiline
              rows={4}
              label="Observação"
              defaultValue={ugRegistration.obs}
            />
          </Grid>

          <Grid item xs={12} md={12}>
            <Typography variant="body1">
              Documentos da Unidade Gestora
            </Typography>

            <List style={{ margin: 0, padding: 0 }}>
              {ugFiles.map((ugFile) => (
                <ListItem key={ugFile.id} style={{ paddingLeft: 0 }}>
                  <ListItemAvatar>
                    <Avatar>
                      <Description />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    color="primary"
                    primary={ugFile.original_name}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      rel="noreferrer"
                      target="_blank"
                      href={ugFile.url}
                    >
                      <GetApp color="primary" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Box>

      <Divider />

      <Box marginY={4}>
        <Typography variant="h6">Ordenador de Despesa</Typography>

        <Box marginTop={4}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <InputText
                InputProps={{
                  readOnly: true,
                }}
                label="CPF"
                defaultValue={ugRegistration.expense_ordinator_cpf}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <InputText
                InputProps={{
                  readOnly: true,
                }}
                label="Nome"
                defaultValue={ugRegistration.expense_ordinator_name}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <InputText
                InputProps={{
                  readOnly: true,
                }}
                label="Email"
                defaultValue={ugRegistration.expense_ordinator_email}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <Typography variant="body1">Documentos do Ordenador</Typography>

              <List style={{ margin: 0, padding: 0 }}>
                {ordinatorFiles.map((ordinatorFile) => (
                  <ListItem key={ordinatorFile.id} style={{ paddingLeft: 0 }}>
                    <ListItemAvatar>
                      <Avatar>
                        <Description />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      color="primary"
                      primary={ordinatorFile.original_name}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        rel="noreferrer"
                        target="_blank"
                        href={ordinatorFile.url}
                      >
                        <GetApp color="primary" />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Dialog
        open={openApprovalDialog}
        onClose={() => setOpenApprovalDialog(false)}
      >
        <DialogTitle>Registro de UG - Aprovar</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Você tem certeza que deseja aprovar o registro enviado pela ug? Esta
            operação não poderá ser desfeita.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenApprovalDialog(false)} color="primary">
            CANCELAR
          </Button>
          <Button
            disabled={loadingApproval}
            onClick={handleAprroval}
            color="primary"
            autoFocus
          >
            {loadingApproval ? <CircularProgress size={24} /> : 'SIM'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openRefusalDialog}
        onClose={() => setOpenRefusalDialog(false)}
      >
        <Formik
          validationSchema={validationSchema}
          onSubmit={handleRefusal}
          initialValues={{
            status_justification: '',
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <DialogTitle>Registro de UG - Recusar</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Você tem certeza que deseja recusar o registro enviado pela
                  ug? Esta operação não poderá ser desfeita.
                </DialogContentText>

                <Field name="status_justification">
                  {({ field, meta }: FieldProps) => (
                    <InputText
                      multiline
                      required
                      rows={4}
                      label="Justificativa"
                      {...field}
                      errors={meta.error}
                      touched={meta.touched}
                    />
                  )}
                </Field>
              </DialogContent>

              <DialogActions>
                <Button
                  onClick={() => setOpenRefusalDialog(false)}
                  color="primary"
                >
                  CANCELAR
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  autoFocus
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <CircularProgress size={24} /> : 'SIM'}
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>

      <Dialog
        open={openJustificationDialog}
        onClose={() => setOpenJustificationDialog(false)}
      >
        <DialogTitle>Justificativa</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {ugRegistration.status_justification}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenJustificationDialog(false)}
            color="primary"
            autoFocus
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Show;
