import React from 'react';
import T from 'prop-types';
import classNames from 'classnames';

import List from '../List';

import './styles.css';

function ADSSCard({ name, image, price, hasStock, onAddToCartClick }) {
  return (
    <div className="ADSS-card">
      <div className="picture">
        <picture>
          <img alt={name} src={`/images/${image}`} />
        </picture>
      </div>
      <footer className="footer">
        <div className="info">
          <span className="name">{name}</span>
          <span className="price">{`${price.toLocaleString()} €`}</span>
        </div>
        <div className="actions">
          {hasStock ? (
            <button className="button" onClick={onAddToCartClick}>
              add to cart
            </button>
          ) : (
            <span className="no-stock">out of stock!</span>
          )}
        </div>
      </footer>
    </div>
  );
}

ADSSCard.propTypes = {
  name: T.string.isRequired,
  image: T.string.isRequired,
  price: T.number.isRequired,
  hasStock: T.bool,
  onAddToCartClick: T.func.isRequired,
};

ADSSCard.defaultProps = {
  stock: false,
};

export default function ADSList({ className, ADS, addToCart }) {
  return (
    <div className={classNames('ADS-list', className)}>
      ADS List
      <List
        className="list"
        items={ADS}
        renderItem={ADSS => (
          <ADSSCard {...ADSS} onAddToCartClick={() => addToCart(ADSS.id)} />
        )}
      />
    </div>
  );
}

ADSList.propTypes = {
  className: T.string,
  ADS: T.arrayOf(T.shape({ id: T.string.isRequired })),
  addToCart: T.func.isRequired,
};
