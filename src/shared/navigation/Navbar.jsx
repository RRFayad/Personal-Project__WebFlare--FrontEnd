import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';

import AuthContext from '../context/AuthContext';

import classes from './Navbar.module.css';

function Navbar() {
  const { logoutHandler, isLoggedIn } = useContext(AuthContext);
  return (
    <nav className={`${classes['nav-bar']}`}>
      <div className={`${classes['nav-bar__sandwich-menu']}`}>
        <span />
        <span />
        <span className={`${classes['nav-bar__sandwich-bar--last']}`} />
      </div>
      <Link to="/" className={`${classes['nav-bar__logo']}`}>
        <h2>LOGO HERE</h2>
      </Link>
      <ul className={`${classes['nav-bar__links']}`}>
        {isLoggedIn && (
          <li className={`${classes['nav-bar__item']}`}>
            <NavLink to="/users/:uid/my-business" exact>
              My Assets
            </NavLink>
          </li>
        )}
        {isLoggedIn && (
          <li className={`${classes['nav-bar__item']}`}>
            <NavLink to="/users/:uid/create-business" exact>
              Add Business
            </NavLink>
          </li>
        )}
        {isLoggedIn && (
          <li className={`${classes['nav-bar__item']}`}>
            <NavLink to="/" exact onClick={logoutHandler}>
              Logout
            </NavLink>
          </li>
        )}
        {!isLoggedIn && (
          <li
            className={`${classes['nav-bar__item']} ${classes['nav-bar__item--cta']}`}
          >
            <NavLink to="/auth" exact>
              Login
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
