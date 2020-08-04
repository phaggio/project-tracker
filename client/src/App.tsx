import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';

import * as pages from './pages'

const App = () => {
  return (
    <div className="App">
      <HashRouter>
        <NavBar />

        {/* <Route render={
          ({ location }) => (
            <TransitionGroup mode="out-in">
              <CSSTransition key={location.pathname} classNames="fade" timeout={600} >

                <Switch location={location}>
                  <Route exact path='/' component={Overview} />
                  <Route exact path='/boards' component={Boards} />
                  <Route exact path='/settings' component={Settings} />
                </Switch>


              </CSSTransition>
            </TransitionGroup>
          )}
        /> */}

        <Switch>
          <Route exact path='/' component={pages.Overview} />
          <Route exact path='/boards' component={pages.Boards} />
          <Route exact path='/settings' component={pages.Settings} />
          <Route exact path='/new/project' component={pages.NewProject} />
          <Route exact path='/new/feature' component={pages.NewFeature} />
          <Route exact path='/new/item' component={pages.NewWorkItem} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
