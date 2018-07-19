import React from 'react';
import { Router, routerRedux, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import UserList from './routes/UserList'

const { ConnectedRouter } = routerRedux;

function RouterConfig({ history }) {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/list" exact component={UserList} />
      </Switch>
    </ConnectedRouter>
  );
}

export default RouterConfig;  
