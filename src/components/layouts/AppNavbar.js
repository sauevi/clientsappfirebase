import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class AppNavbar extends Component {
  render() {
    return (
      <nav
        className="navbar navbar-expand-md navbar-dark navbar-fixed-top"
        style={{ backgroundColor: '#1298AE' }}
      >
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            SocialPanel
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarMain"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarMain">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

/*


*/
