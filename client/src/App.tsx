import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
// import { TransitionGroup, CSSTransition, SwitchTransition, Transition } from 'react-transition-group';
import './App.css';
import NavBar from './components/NavBar';
import Overview from './pages/Overview';
import Boards from './pages/Boards';
import Settings from './pages/Settings';


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
          <Route exact path='/' component={Overview} />
          <Route exact path='/boards' component={Boards} />
          <Route exact path='/settings' component={Settings} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;