import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import * as pages from './pages';

const App = () => {
  return (
    <div className="App">

      <NavBar />
      <Switch>
        <Route exact={true} path='/' component={pages.Home} />
        <Route exact={true} path='/boards' component={pages.Boards} />
        <Route exact={true} path='/settings' component={pages.Settings} />
        <Route exact={true} path='/new/project' component={pages.NewProject} />
        <Route exact={true} path='/new/feature/:type?/:name?/:id?' component={pages.NewFeature} />
        <Route exact={true} path='/new/item' component={pages.NewWorkItem} />
        <Route exact={true} path='/new/user' component={pages.NewUser} />
        <Route exact={false} path='/project/:id' component={pages.Project} />
      </Switch>

    </div>
  );
}

export default App;
