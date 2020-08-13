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
        <Route exact={true} path='/new/feature' component={pages.NewFeature} />
        <Route exact={true} path='/new/item' component={pages.NewWorkItem} />
        <Route path='/project' component={pages.Project} />
        {/* <Route path='/:id' render={() => (<p>always render extra stuff</p>)}/> */}
      </Switch>

    </div>
  );
}

export default App;
