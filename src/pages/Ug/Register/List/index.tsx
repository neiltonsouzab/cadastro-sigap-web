import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Typography,
  Box,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  makeStyles,
  createStyles,
  Theme,
  IconButton,
  InputLabel,
  Checkbox,
  ListItemText,
  FormControl,
  Select,
  MenuItem,
  TablePagination,
} from '@material-ui/core';
import { Add, Search } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import qs from 'qs';

import { useAuth } from '../../../../hooks/auth';
import useAPI from '../../../../hooks/api';
import { UgRegistration } from '../../../../models';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chipDefault: {
      backgroundColor: theme.palette.primary.main,
      color: '#FFF',
    },
    chipSuccess: {
      backgroundColor: theme.palette.success.main,
      color: '#FFF',
    },
    chipDanger: {
      backgroundColor: theme.palette.error.main,
      color: '#FFF',
    },
  }),
);

const UserList: React.FC = () => {
  const classes = useStyles();

  const api = useAPI();

  const status = {
    ANALISE: classes.chipDefault,
    RECUSADO: classes.chipDanger,
    APROVADO: classes.chipSuccess,
  };

  const history = useHistory();
  const { user } = useAuth();

  const [selectedsUgs, setSelectedsUgs] = useState<number[]>([]);

  const [ugsRegistrations, setUgsRegistrations] = useState<UgRegistration[]>(
    [],
  );

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const loadUgsRegistrations = async (): Promise<void> => {
      const response = await api.get('/ugs-registrations', {
        params: {
          filter: selectedsUgs,
        },
        paramsSerializer: (params) => {
          return qs.stringify(params);
        },
      });

      const { data, ...rest } = response.data;

      setUgsRegistrations(
        (data as UgRegistration[]).map((item) => ({
          ...item,
          created_at: format(parseISO(item.created_at), 'dd/MM/yyyy HH:mm:ss'),
          updated_at: format(parseISO(item.updated_at), 'dd/MM/yyyy HH:mm:ss'),
        })),
      );

      setPage(rest.page);
      setPages(rest.pages);
      setPerPage(rest.perPage);
      setCount(rest.count);
    };

    loadUgsRegistrations();
  }, [selectedsUgs, api]);

  const handleNavigateToUgRegisterCreate = useCallback(() => {
    history.push('/ugs/registrations/create');
  }, [history]);

  const handleNavigateToUgRegisterShow = useCallback(
    (id: number) => {
      history.push(`/ugs/registrations/${id}`);
    },
    [history],
  );

  return (
    <Box paddingY={4} paddingX={4}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography variant="h4" color="textPrimary">
            Registros de UG
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Listagem completa de registros enviados pelas unidades gestoras.
          </Typography>
        </Box>

        <Button
          variant="outlined"
          size="large"
          startIcon={<Add />}
          color="primary"
          onClick={handleNavigateToUgRegisterCreate}
        >
          NOVO REGISTRO
        </Button>
      </Box>

      <Box marginTop={4}>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="demo-mutiple-checkbox-label">UG</InputLabel>
          <Select
            fullWidth
            multiple
            label="UG"
            variant="outlined"
            labelId="ugs-label"
            id="ug-mutiple-checkbox"
            value={selectedsUgs}
            onChange={(event) =>
              setSelectedsUgs(event.target.value as number[])
            }
            renderValue={(value) => {
              const ids = value as number[];
              const ugs = user.ugs.filter((ug) => ids.includes(ug.id));

              return ugs.map((ug) => (
                <Chip
                  color="secondary"
                  key={ug.id}
                  label={`${ug.code} - ${ug.short_name}`}
                  style={{ marginRight: 4 }}
                />
              ));
            }}
          >
            {user.ugs.map((ug) => (
              <MenuItem key={ug.id} value={ug.id} alignItems="flex-start">
                <Checkbox checked={selectedsUgs.includes(ug.id)} />
                <ListItemText
                  primary={`${ug.code} - ${ug.short_name}`}
                  secondary={ug.name}
                />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>UG</TableCell>
                  <TableCell align="center">Data registro</TableCell>
                  <TableCell align="center">Data análise</TableCell>
                  <TableCell align="center">STATUS</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {ugsRegistrations.map((ugRegistration) => (
                  <TableRow key={ugRegistration.id}>
                    <TableCell>
                      <Box>
                        <Box>
                          <Typography variant="subtitle2" color="textPrimary">
                            {ugRegistration.ug.code} -{' '}
                            {ugRegistration.ug.short_name}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {ugRegistration.ug.name}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      {ugRegistration.created_at}
                    </TableCell>
                    <TableCell align="center">
                      {ugRegistration.status !== 'ANALISE' &&
                        ugRegistration.updated_at}
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        className={status[ugRegistration.status]}
                        label={ugRegistration.status}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={() =>
                          handleNavigateToUgRegisterShow(ugRegistration.id)
                        }
                      >
                        <Search color="primary" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <TablePagination
              rowsPerPageOptions={[10, 20, 30]}
              component="div"
              count={count}
              rowsPerPage={perPage}
              page={page - 1}
              labelDisplayedRows={({ from, to, count }) => (
                <p>{`${from}-${to} de ${count}`}</p>
              )}
              labelRowsPerPage="Linhas por página"
              onChangePage={(_, page) => setPage(page + 1)}
              onChangeRowsPerPage={(event) => {
                setPerPage(Number(event.target.value));
                setPage(1);
              }}
            />
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default UserList;
