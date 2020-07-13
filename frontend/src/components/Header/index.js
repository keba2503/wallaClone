import { connect } from 'react-redux';

import Header from './Header';

import { getTotalCartItems } from '../../store/selectors';

function mapStateToProps(state, ownProps) {
  return {
    totalCartItems: getTotalCartItems(state),
  };
}

export default connect(mapStateToProps)(Header);
