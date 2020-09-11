import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { NavBar } from './components';
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
        <Route exact={false} path='/new/feature/:parentType?/:parentId?/:projectId?' component={pages.NewFeature} />
        <Route exact={false} path='/new/work/:parentType?/:parentId?/:projectId?' component={pages.NewWork} />
        <Route exact={false} path='/new/bug/:parentType?/:parentId?/:projectId?' component={pages.NewBug} />
        <Route exact={true} path='/new/user' component={pages.NewUser} />
        <Route exact={false} path='/project/:id?' component={pages.Project} />
        <Route exact={false} path='/feature/:id?' component={pages.Feature} />
        <Route exact={false} path='/workItem/:id?' component={pages.WorkItem} />
        <Route exact={false} path='/bug/:id?' component={pages.Bug} />
      </Switch>

    </div>
  );
}

export default App;
