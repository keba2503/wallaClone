import React from 'react';
import T from 'prop-types';
import { NavLink } from 'react-router-dom';

import './styles.css';
import classNames from 'classnames';

const validFilters = ['/electronic', '/mobile', '/lifestyle'];

export default function Header({ className, totalCartItems }) {
  return (
    <header className={classNames('header', className)}>
      <h1 className="title">ADS - STORE</h1>
      <div className="navbar">
        <NavLink
          className="link"
          isActive={({ isExact }, { pathname }) =>
            isExact || validFilters.includes(pathname)
          }
          to="/"
        >
          ADS
        </NavLink>
        <NavLink className="link" exact to="/cart">
          {`Checkout (${totalCartItems})`}
        </NavLink>
      </div>
    </header>
  );
}

Header.propTypes = {
  className: T.string,
  totalCartItems: T.number.isRequired,
};
