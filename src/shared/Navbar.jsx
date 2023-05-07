import { Link, NavLink } from 'react-router-dom';

import classes from './Navbar.module.css';

function Navbar() {
  return (
    <nav className={`${classes['nav-bar']}`}>
      <div className={`${classes['nav-bar__sandwich-menu']}`}>
        <span />
        <span />
        <span />
      </div>
      <Link to="/" className={`${classes['nav-bar__logo']}`}>
        <h1>LOGO HERE</h1>
      </Link>
      <ul className={`${classes['nav-bar__links']}`}>
        <li className={`${classes['nav-bar__item']}`}>
          <NavLink to="/users/:uid/my-business" exact>
            My Assets
          </NavLink>
        </li>
        <li className={`${classes['nav-bar__item']}`}>
          <NavLink to="/users/:uid/create-business" exact>
            Add Business
          </NavLink>
        </li>
        <li className={`${classes['nav-bar__item']}`}>
          <NavLink to="/" exact>
            Logout
          </NavLink>
        </li>
        <li className={`${classes['nav-bar__item']}`}>
          <NavLink to="/auth" exact>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
