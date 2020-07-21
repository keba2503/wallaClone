import { connect } from 'react-redux';

import ADSList from './ADSList';

import { addToCart } from '../../store/actions';
import { getVisibleADS } from '../../store/selectors';

function mapStateToProps(state, ownProps) {
  return {
    ADS: getVisibleADS(state, ownProps.filter),
  };
}



const mapDispatchToProps = {
  addToCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(ADSList);
