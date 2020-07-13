import React from 'react';
import T from 'prop-types';
import classNames from 'classnames';

import { NavLink } from 'react-router-dom';
import { ADSS_FILTERS } from '../../constants';

import './styles.css';

export default function FilterButton({ className, children, filter }) {
  return (
    <NavLink
      exact
      to={filter === ADSS_FILTERS.ALL ? '/' : `/${filter}`}
      className={classNames('button', 'filter-button', className)}
    >
      {children}
    </NavLink>
  );
}

FilterButton.propTypes = {
  className: T.string,
  children: T.node.isRequired,
};
