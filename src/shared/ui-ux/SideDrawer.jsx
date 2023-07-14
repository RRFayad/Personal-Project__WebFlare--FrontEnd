import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

import classes from './SideDrawer.module.css';

function SideDrawer(props) {
  return ReactDOM.createPortal(
    <aside className={`${classes['modal-menu']}`}>
      <header className={`${classes['modal-menu__header']}`}>
        <button type="button" onClick={props.onClick}>
          <Link to="/">
            <h2 className={`${classes['nav-bar__title']}`}>WEBFLARE</h2>
          </Link>
        </button>
      </header>
      <main className={`${classes['modal-menu__main']}`}>
        <ul className={`${classes['modal-menu__links']}`}>{props.children}</ul>
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

export default SideDrawer;
