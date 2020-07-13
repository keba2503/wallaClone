import React from 'react';
import T from 'prop-types';
import classNames from 'classnames';

import ADSFilters from '../ADSFilters';
import ADSList from '../ADSList';

import './styles.css';
import { ADSS_FILTERS } from '../../constants';

export default function ADSStore({
  className,
  filtersClassName,
  listClassName,
  match: { params },
}) {
  return (
    <div className={classNames('ADS-store', className)}>
      <ADSFilters className={filtersClassName} />
      <ADSList
        className={listClassName}
        filter={params.filter || ADSS_FILTERS.ALL}
      />
    </div>
  );
}

ADSStore.propTypes = {
  className: T.string,
  filtersClassName: T.string,
  listClassName: T.string,
};
