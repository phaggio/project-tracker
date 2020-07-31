import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import $ from 'jquery';

const NavBar = () => {
  const toggle = () => {
    $('.navbar-collapse').collapse('hide');
  }

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light">
      <button className="navbar-toggler" type="button" data-toggle="collapse"
        data-target="#navbar" aria-controls="navbar"
        aria-expanded="true" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbar">
        <a className="navbar-brand" href="#">Project Tracker</a>
        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
          <li className="nav-item">
            <NavLink exact className="nav-link" to="/" onClick={toggle}>Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink exact className="nav-link" to="/boards" onClick={toggle}>Boards</NavLink>
          </li>
          <li className="nav-item">
            <NavLink exact className="nav-link" to="/settings" onClick={toggle}>Settings</NavLink>
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