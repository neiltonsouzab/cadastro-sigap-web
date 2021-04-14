import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';
import SignIn from '../pages/SignIn';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

import UserList from '../pages/User/List';
import UserCreate from '../pages/User/Create';
import UserShow from '../pages/User/Show';

import UgRegisterList from '../pages/Ug/Register/List';
import UgRegisterCreate from '../pages/Ug/Register/Create';
import UgRegisterShow from '../pages/Ug/Register/Show';

import NotFound from '../pages/NotFound';
import Forbidden from '../pages/Forbidden';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route isPrivate={false} path="/" exact component={SignIn} />

      <Route
        isPrivate={false}
        path="/forgot-password"
        component={ForgotPassword}
      />

      <Route
        isPrivate={false}
        path="/reset-password"
        component={ResetPassword}
      />

      <Route isPrivate exact path="/users" component={UserList} />

      <Route isPrivate path="/users/create" component={UserCreate} />

      <Route isPrivate path="/users/:id" component={UserShow} />

      <Route
        isPrivate
        exact
        path="/ugs/registrations"
        component={UgRegisterList}
      />

      <Route
        isPrivate
        path="/ugs/registrations/create"
        component={UgRegisterCreate}
      />

      <Route
        isPrivate
        path="/ugs/registrations/:id"
        component={UgRegisterShow}
      />

      <Route isPrivate={false} path="/403" component={Forbidden} />

      <Route isPrivate={false} path="*" component={NotFound} />
    </Switch>
  );
};

export default Routes;
