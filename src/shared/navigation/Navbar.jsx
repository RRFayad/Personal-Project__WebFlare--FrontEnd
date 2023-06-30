import React, { useState, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';

import AuthContext from '../context/AuthContext';
import ModalMenu from './ModalMenu';
import Backdrop from '../ui-ux/Backdrop';

import classes from './Navbar.module.css';

function Navbar() {
  const { logoutHandler, isLoggedIn, userData } = useContext(AuthContext);
  const [modalMenuIsShown, setModalMenuIsShown] = useState(false);

  return (
    <>
      {modalMenuIsShown && (
        <>
          <ModalMenu />
          <Backdrop onClick={() => setModalMenuIsShown((state) => !state)} />
        </>
      )}
      <nav className={`${classes['nav-bar']}`}>
        <button
          type="button"
          className={`${classes['nav-bar__sandwich-menu']}`}
          onClick={() => setModalMenuIsShown((state) => !state)}
        >
          <span />
          <span />
          <span className={`${classes['nav-bar__sandwich-bar--last']}`} />
        </button>
        <Link to="/" className={`${classes['nav-bar__logo']}`}>
          <h2>WEBFLARE</h2>
        </Link>
        <ul className={`${classes['nav-bar__links']}`}>
          {isLoggedIn && (
            <li className={`${classes['nav-bar__link']}`}>
              <NavLink to={`/users/${userData.id}/profile`} exact>
                My Profile
              </NavLink>
            </li>
          )}
          {isLoggedIn && (
            <li className={`${classes['nav-bar__link']}`}>
              <NavLink to={`/users/${userData.id}/create-business`} exact>
                Add Business
              </NavLink>
            </li>
          )}
          {isLoggedIn && (
            <li className={`${classes['nav-bar__link']}`}>
              <NavLink to="/" exact onClick={logoutHandler}>
                Logout
              </NavLink>
            </li>
          )}
          {!isLoggedIn && (
            <li
              className={`${classes['nav-bar__link']} ${classes['nav-bar__link--cta']}`}
            >
              <NavLink to="/auth" exact>
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
