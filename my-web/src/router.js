import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Example from './components/Example'
import Marry from './routes/Marry'


function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/list" exact component={Example} />
        <Route path="/marry" exact component={Marry} />
        
      </Switch>
    </Router>
  );
}

export default RouterConfig;  
