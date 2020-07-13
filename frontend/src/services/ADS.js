import { ADSS_TYPES } from '../constants';

const ADS = [
  {
    id: '1',
    image: 'Alexa.jpg',
    name: 'Alexa',
    price: 1800,
    stock: 10,
    type: ADSS_TYPES.ELECTRONIC,
  },
  {
    id: '2',
    image: 'apple.jpg',
    name: 'Apple Watch',
    price: 3500,
    stock: 10,
    type: ADSS_TYPES.ELECTRONIC,
  },
  {
    id: '3',
    name: 'Iphone',
    type: ADSS_TYPES.MOBILE,
    price: 1990,
    stock: 8,
    image: 'iphone.jpg',
  },
  {
    id: '4',
    name: 'Mac',
    type: ADSS_TYPES.LIFESTYLE,
    price: 2500,
    stock: 5,
    image: 'mac.jpg',
  },
  {
    id: '5',
    name: 'Ipad',
    type: ADSS_TYPES.LIFESTYLE,
    price: 2500,
    stock: 5,
    image: 'ipad.jpg',
  },
  {
    id: '6',
    image: 'Alexa.jpg',
    name: 'Alexa2',
    price: 1800,
    stock: 10,
    type: ADSS_TYPES.ELECTRONIC,
  },
  {
    id: '7',
    image: 'apple.jpg',
    name: 'Apple Watch2',
    price: 3500,
    stock: 10,
    type: ADSS_TYPES.ELECTRONIC,
  },
  {
    id: '8',
    name: 'Iphone2',
    type: ADSS_TYPES.MOBILE,
    price: 1990,
    stock: 8,
    image: 'iphone.jpg',
  },
  {
    id: '9',
    name: 'Mac2',
    type: ADSS_TYPES.LIFESTYLE,
    price: 2500,
    stock: 5,
    image: 'mac.jpg',
  },
  {
    id: '10',
    name: 'Ipad2',
    type: ADSS_TYPES.LIFESTYLE,
    price: 2500,
    stock: 5,
    image: 'ipad.jpg',
  },
];

const TIMEOUT = 1000;
const ERROR_THRESHOLD = 0.95;
const NETWORK_ERROR = 'Network Error.';

const simulateNetworkRequest = (config = {}) => () => {
  const {
    result = undefined,
    errorMessage = NETWORK_ERROR,
    timeout = TIMEOUT,
    errorThreshold = ERROR_THRESHOLD,
  } = config;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > errorThreshold) {
        reject(new Error(errorMessage));
      }
      resolve(result);
    }, timeout);
  });
};

export default {
  getAllADS: simulateNetworkRequest({ result: ADS }),
  checkoutCart: simulateNetworkRequest({
    timeout: TIMEOUT * 2,
  }),
  addToCart: simulateNetworkRequest({
    timeout: TIMEOUT / 2,
  }),
  removeFromCart: simulateNetworkRequest({
    timeout: TIMEOUT / 2,
  }),
};
