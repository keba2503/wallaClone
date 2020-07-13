import React from 'react';
import T from 'prop-types';
import classNames from 'classnames';

import FilterButton from '../FilterButton';
import { ADSS_FILTERS } from '../../constants';

import './styles.css';

export default function ADSFilters({ className }) {
  return (
    <div className={classNames('ADS-filters', className)}>
      ADSS type:
      <FilterButton className="filter" filter={ADSS_FILTERS.ALL}>
        All
      </FilterButton>
      <FilterButton className="filter" filter={ADSS_FILTERS.ELECTRONIC}>
        Electronic
      </FilterButton>
      <FilterButton className="filter" filter={ADSS_FILTERS.MOBILE}>
        Mobile
      </FilterButton>
      <FilterButton className="filter" filter={ADSS_FILTERS.LIFESTYLE}>
       LifeStyle
      </FilterButton>
    </div>
  );
}

ADSFilters.propTypes = {
  className: T.string,
  ADSFilter: T.oneOf(Object.values(ADSS_FILTERS)),
};
