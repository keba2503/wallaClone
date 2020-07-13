import { connect } from 'react-redux';

import Cart from './Cart';

import { getCartItems } from '../../store/selectors';
import { checkoutCartAndNavigate, removeFromCart } from '../../store/actions';

function mapStateToProps(state, ownProps) {
  return {
    items: getCartItems(state),
  };
}

const mapDispatchToProps = {
  checkoutCart: checkoutCartAndNavigate,
  removeFromCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
