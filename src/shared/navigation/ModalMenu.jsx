import React from 'react';

import classes from './ModalMenu.module.css';

function ModalMenu() {
  return (
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

export default ModalMenu;
