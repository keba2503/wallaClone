import { ADSS_FILTERS } from '../constants';

export const getADS = state => state.ADS;
export const getCart = state => state.cart;
export const isActiveFilter = (state, filter) => state.filter === filter;

export function getVisibleADS(state, filter) {
  const ADS = getADS(state);
  let visibleADS = ADS;
  if (filter !== ADSS_FILTERS.ALL) {
    visibleADS = ADS.filter(ADSS => ADSS.type === filter);
  }
  return visibleADS.map(ADSS => ({ ...ADSS, hasStock: ADSS.stock > 0 }));
}

export function getTotalCartItems(state) {
  const cart = getCart(state);
  return Object.values(cart).reduce((acc, quantity) => acc + quantity, 0);
}

export function getCartItems(state) {
  const ADS = getADS(state);
  const cart = getCart(state);
  return Object.entries(cart).map(entry => {
    const [ADSSId, quantity] = entry;
    const ADSS = ADS.find(ADSS => ADSS.id === ADSSId);
    return { ...ADSS, quantity, totalPrice: ADSS.price * quantity };
  });
}

export function getADSSQuantityInCart(state, ADSSId) {
  const cart = getCart(state);
  return cart[ADSSId] || 0;
}

export const getUi = state => state.ui;
