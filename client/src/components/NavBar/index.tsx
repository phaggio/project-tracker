import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import $ from 'jquery';

const NavBar = () => {
  const toggle = () => {
    $('.navbar-collapse').collapse('hide')
  }

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light">
      <button className="navbar-toggler" type="button" data-toggle="collapse"
        data-target="#navbar" aria-controls="navbar"
        aria-expanded="true" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbar">
        <NavLink exact className="navbar-brand" to="/">Project Tracker</NavLink>
        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
          <li className="nav-item ml-2">
            <NavLink exact className="nav-link" to="/" onClick={toggle}>Overview</NavLink>
          </li>
          <li className="nav-item ml-2">
            <NavLink exact className="nav-link" to="/search" onClick={toggle}>Search</NavLink>
          </li>
          <li className="nav-item ml-2">
            <NavLink exact className="nav-link" to="/settings" onClick={toggle}>Settings</NavLink>
          </li>
          <li className="nav-item dropdown ml-2">
            <Link className="nav-link dropdown-toggle text-success"
              to="/" id="navbarDropdown" role="button" data-toggle="dropdown"
              aria-haspopup="true" aria-expanded="false">
              Add new
            </Link>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link className="dropdown-item" to="/new/project">Project</Link>
              <Link className="dropdown-item" to="/new/feature">Feature</Link>
              <Link className="dropdown-item" to="/new/work">Work</Link>
              <Link className="dropdown-item" to="/new/bug">Bug</Link>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default NavBar;