import React from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';
import { NavBar } from './components';
import * as pages from './pages';

const App = () => {
  return (
    <div className="App">
      <HashRouter>
        <NavBar />
        <Switch>
          <Route exact={true} path='/' component={pages.Home} />
          <Route exact={true} path='/search' component={pages.Search} />
          <Route exact={true} path='/settings' component={pages.Settings} />
          <Route exact={true} path='/new/project' component={pages.NewProject} />
          <Route exact={true} path='/new/feature/:parentType?/:parentId?/:projectId?' component={pages.NewFeature} />
          <Route exact={true} path='/new/work/:parentType?/:parentId?/:projectId?' component={pages.NewWork} />
          <Route exact={true} path='/new/bug/:parentType?/:parentId?/:projectId?' component={pages.NewBug} />
          <Route exact={true} path='/new/user' component={pages.NewUser} />
          <Route exact={true} path='/project/:id?' component={pages.Project} />
          <Route exact={true} path='/feature/:id?' component={pages.Feature} />
          <Route exact={true} path='/work/:id?' component={pages.Work} />
          <Route exact={true} path='/bug/:id?' component={pages.Bug} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
