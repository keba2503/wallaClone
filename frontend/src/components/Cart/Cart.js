import React from 'react';
import T from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import List from '../List';

import './styles.css';

function CartItem({
  name,
  image,
  totalPrice,
  quantity,
  onRemoveFromCartClick,
}) {
  return (
    <div className="cart-item">
      <div className="picture">
        <picture>
          <img alt={name} src={`/images/${image}`} />
        </picture>
      </div>
      <span className="name">{name}</span>
      <span className="quantity">{`${quantity}`}</span>
      <span className="price">{`${totalPrice.toLocaleString()} €`}</span>
      <button className="link remove" onClick={onRemoveFromCartClick}>
        remove from cart
      </button>
    </div>
  );
}

CartItem.propTypes = {
  name: T.string.isRequired,
  image: T.string.isRequired,
  totalPrice: T.number.isRequired,
  quantity: T.number.isRequired,
  onRemoveFromCartClick: T.func.isRequired,
};

const CartHeader = () => (
  <div className="cart-header list-item">
    <span className="picture">checkout cart</span>
    <span className="name">details</span>
    <span className="quantity">quantity</span>
    <span className="price">price</span>
    <button className="remove">remove from cart</button>
  </div>
);

export default function Cart({
  className,
  items,
  removeFromCart,
  checkoutCart,
}) {
  return (
    <div className={classNames('cart', className)}>
      {items.length ? (
        <>
          <CartHeader />
          <List
            className="list"
            items={items}
            renderItem={item => (
              <CartItem
                {...item}
                onRemoveFromCartClick={() => removeFromCart(item.id)}
              />
            )}
          />
          <button className="button active checkout" onClick={checkoutCart}>
            CHECKOUT CART
          </button>
        </>
      ) : (
        <div>
          No ADS in your cart, go to{' '}
          <Link className="link" to="/">
            ADS Store
          </Link>{' '}
          and choose your favourites.
        </div>
      )}
    </div>
  );
}

Cart.propTypes = {
  className: T.string,
  items: T.arrayOf(T.shape({ id: T.string.isRequired })),
  removeFromCart: T.func.isRequired,
  checkoutCart: T.func.isRequired,
};
