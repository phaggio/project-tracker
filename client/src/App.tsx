import React from 'react';
import ReactDom from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
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
        <Switch>
          <Route exact path='/' component={Overview} />
          <Route exact path='/boards' component={Boards} />
          <Route exact path='/settings' component={Settings} />
          {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
        </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
        </a>
        </header> */}

        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
