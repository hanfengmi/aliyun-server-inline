import React from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import UserList from './routes/UserList';
import MarryImage from './routes/MarryImage'
import Calender from './routes/Calender'
import PageNotFoundFront from './components/PageNotFoundFront'

const { ConnectedRouter } = routerRedux;

function RouterConfig({ history }) {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/list" exact component={UserList} />
        <Route path="/marry" exact component={MarryImage} />
        <Route path="/calender" exact component={Calender} />
        <Route component={PageNotFoundFront} />
      </Switch>
    </ConnectedRouter>
  );
}

export default RouterConfig;
