import React from 'react';
import T from 'prop-types';

export default function List({ className, items, renderItem }) {
  return (
    <ul className={className}>
      {items.map(item => (
        <li className={`${className}-item`} key={item.id}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}

List.propTypes = {
  className: T.string,
  items: T.arrayOf(T.shape({ id: T.string.isRequired })).isRequired,
  renderItem: T.func.isRequired,
};
