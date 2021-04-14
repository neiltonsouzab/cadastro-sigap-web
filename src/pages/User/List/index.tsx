import React, { useState, useEffect, useCallback } from 'react';
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
  TablePagination,
  Chip,
  makeStyles,
  createStyles,
  Theme,
  IconButton,
} from '@material-ui/core';
import { Add, Search } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

import useAPI from '../../../hooks/api';

import InputText from '../../../components/InputText';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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

interface User {
  id: number;
  name: string;
  email: string;
  cpf: string;
  enabled: boolean;
  blocked: boolean;
}

const UserList: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();

  const api = useAPI();

  const [users, setUsers] = useState<User[]>([]);

  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const loadUsers = async (): Promise<void> => {
      const response = await api.get('/users', {
        params: {
          filter,
          page,
          perPage,
        },
      });

      const { data, ...rest } = response.data;

      setUsers(data);
      setPage(rest.page);
      setPages(rest.pages);
      setPerPage(rest.perPage);
      setCount(rest.count);
    };

    loadUsers();
  }, [filter, page, perPage, api]);

  const handleNavigateToUserCreate = useCallback(() => {
    history.push('/users/create');
  }, [history]);

  const handleNavigateToUserShow = useCallback(
    (user_id: number) => {
      history.push(`/users/${user_id}`);
    },
    [history],
  );

  return (
    <Box paddingY={4} paddingX={4}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography variant="h4" color="textPrimary">
            Usuários
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Listagem completa de usuários
          </Typography>
        </Box>

        <Button
          variant="outlined"
          size="large"
          startIcon={<Add />}
          color="primary"
          onClick={handleNavigateToUserCreate}
        >
          Adicionar novo
        </Button>
      </Box>

      <Box marginTop={4}>
        <InputText
          size="medium"
          label="Filtro"
          placeholder="Pesquise por nome ou cpf"
          onChange={(event) => setFilter(event.target.value)}
        />

        <Box marginTop={2}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>CPF</TableCell>
                  <TableCell align="center">Bloqueado</TableCell>
                  <TableCell align="center">Ativo</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Box>
                        <Typography variant="subtitle2" color="textPrimary">
                          {user.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {user.email}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{user.cpf}</TableCell>
                    <TableCell align="center">
                      {user.blocked ? (
                        <Chip label="Sim" className={classes.chipDanger} />
                      ) : (
                        <Chip label="Não" className={classes.chipSuccess} />
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {user.enabled ? (
                        <Chip label="Sim" className={classes.chipSuccess} />
                      ) : (
                        <Chip label="Não" className={classes.chipDanger} />
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={() => handleNavigateToUserShow(user.id)}
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
