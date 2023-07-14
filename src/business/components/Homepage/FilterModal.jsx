import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { NavLink, Link } from 'react-router-dom';

import SideDrawer from '../../../shared/ui-ux/SideDrawer';
import SidebarFilters from './SidebarFilters';
import classes from './FilterModal.module.css';

function FilterModal(props) {
  return ReactDOM.createPortal(
    <SideDrawer onClick={props.onClick}>
      <SidebarFilters />
    </SideDrawer>,
    document.querySelector('#modal')
  );
}

export default FilterModal;
