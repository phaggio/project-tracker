import React from 'react';
import { NavLink } from 'react-router-dom';


const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
        <a className="navbar-brand" href="#">Project Tracker</a>
        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
          <li className="nav-item">
            <NavLink exact className="nav-link" to="/">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink exact className="nav-link" to="/boards">Boards</NavLink>
          </li>
          <li className="nav-item">
            <NavLink exact className="nav-link" to="/settings">Settings</NavLink>
          </li>
          {/* <li className="nav-item">
            <a className="nav-link disabled" href="#" tabIndex={1} aria-disabled="true">Disabled</a>
          </li> */}
        </ul>
      </div>
    </nav>
  )
}

export default NavBar;