import React from 'react';
import { BrowserRouter, HashRouter, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';

import * as pages from './pages'

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path='/' component={pages.Overview} />
          <Route exact path='/boards' component={pages.Boards} />
          <Route exact path='/settings' component={pages.Settings} />
          <Route exact path='/new/project' component={pages.NewProject} />
          <Route exact path='/new/feature' component={pages.NewFeature} />
          <Route exact path='/new/item' component={pages.NewWorkItem} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
