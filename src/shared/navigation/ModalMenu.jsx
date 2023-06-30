import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { NavLink, Link } from 'react-router-dom';

import AuthContext from '../context/AuthContext';
import classes from './ModalMenu.module.css';

function ModalMenu() {
  const { logoutHandler, isLoggedIn } = useContext(AuthContext);

  return ReactDOM.createPortal(
    <aside className={`${classes['modal-menu']}`}>
      <header className={`${classes['modal-menu__header']}`}>
        <button type="button">
          <Link to="/">
            <h2 className={`${classes['nav-bar__title']}`}>WEBFLARE</h2>
          </Link>
        </button>
      </header>
      <main className={`${classes['modal-menu__main']}`}>
        <ul className={`${classes['modal-menu__links']}`}>
          {isLoggedIn && (
            <div className={`${classes['modal-menu__links--nav-links']}`}>
              <li className={`${classes['modal-menu__link']}`}>
                <button type="button">
                  <NavLink to="/" exact>
                    HomePage
                  </NavLink>
                </button>
              </li>

              <li className={`${classes['modal-menu__link']}`}>
                <button type="button">
                  <NavLink to="/users/:uid/profile" exact>
                    My Profile
                  </NavLink>
                </button>
              </li>

              <li className={`${classes['modal-menu__link']}`}>
                <button type="button">
                  <NavLink to="/users/:uid/create-business" exact>
                    Add Business
                  </NavLink>
                </button>
              </li>
            </div>
          )}
          {isLoggedIn && (
            <li className={`${classes['modal-menu__link']}`}>
              <button type="button" onClick={logoutHandler}>
                <NavLink to="/" exact>
                  Logout
                </NavLink>
              </button>
            </li>
          )}
          {!isLoggedIn && (
            <li
              className={`${classes['modal-menu__link']} ${classes['modal-menu__link--cta']}`}
            >
              <button type="button">
                <NavLink to="/auth" exact>
                  Login
                </NavLink>
              </button>
            </li>
          )}
        </ul>
      </main>
      <footer className={classes['modal-menu__footer']}>
        <a
          href="https://api.whatsapp.com/send?phone=5511992861954&text="
          target="_blank"
          rel="noreferrer"
        >
          Contact Me
        </a>
        <p>RRFayad ©</p>
      </footer>
    </aside>,
    document.querySelector('#modal')
  );
}

export default ModalMenu;
