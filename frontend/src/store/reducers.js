import * as TYPES from './types';

const initialState = {
  ADS: [],
  cart: {},
  ui: {
    error: null,
    isFetching: false,
  },
};

const updateItem = (items, updatedId, update) => {
  return items.map(item => {
    if (item.id === updatedId) {
      return {
        ...item,
        ...update(item),
      };
    }
    return item;
  });
};

export function ADS(state = initialState.ADS, action) {
  switch (action.type) {
    case TYPES.FETCH_ADS_SUCCESS:
      return action.ADS;

    case TYPES.ADD_TO_CART_SUCCESS:
      return updateItem(state, action.ADSSId, ADSS => ({
        stock: ADSS.stock - action.quantity,
      }));

    case TYPES.REMOVE_FROM_CART_SUCCESS:
      return updateItem(state, action.ADSSId, ADSS => ({
        stock: ADSS.stock + action.quantity,
      }));

    default:
      return state;
  }
}

export function cart(state = initialState.cart, action) {
  switch (action.type) {
    case TYPES.ADD_TO_CART_SUCCESS:
      return {
        ...state,
        [action.ADSSId]: (state[action.ADSSId] || 0) + action.quantity,
      };

    case TYPES.REMOVE_FROM_CART_SUCCESS:
      const { [action.ADSSId]: _, ...newCart } = state;
      return newCart;

    case TYPES.CHECKOUT_CART_SUCCESS:
      return initialState.cart;

    default:
      return state;
  }
}

// export function ui(state = initialState.ui, action) {
//   switch (action.type) {
//     case TYPES.FETCH_ADS_REQUEST:
//     case TYPES.CHECKOUT_CART_REQUEST:
//     case TYPES.ADD_TO_CART_REQUEST:
//     case TYPES.REMOVE_FROM_CART_REQUEST:
//       return {
//         ...state,
//         isFetching: true,
//         error: null,
//       };

//     case TYPES.FETCH_ADS_FAILURE:
//     case TYPES.CHECKOUT_CART_FAILURE:
//     case TYPES.ADD_TO_CART_FAILURE:
//     case TYPES.REMOVE_FROM_CART_FAILURE:
//       return {
//         ...state,
//         isFetching: false,
//         error: action.error,
//       };

//     case TYPES.FETCH_ADS_SUCCESS:
//     case TYPES.CHECKOUT_CART_SUCCESS:
//     case TYPES.ADD_TO_CART_SUCCESS:
//     case TYPES.REMOVE_FROM_CART_SUCCESS:
//       return {
//         ...state,
//         isFetching: false,
//         error: null,
//       };

//     default:
//       return state;
//   }
// }

// Alternative ui reducer
// evaluate by regex if action ends by
// _REQUEST
// _SUCCESS
// _FAILURE
export function ui(state = initialState.ui, action) {
  if (/_REQUEST$/.test(action.type)) {
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  }

  if (/_SUCCESS$/.test(action.type)) {
    return {
      ...state,
      isFetching: false,
      error: null,
    };
  }

  if (/_FAILURE$/.test(action.type)) {
    return {
      ...state,
      isFetching: false,
      error: action.error,
    };
  }

  return state;
}
