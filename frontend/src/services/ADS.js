import axios from 'axios';


const API_URL= 'https://localhost:3000/api';


const ADS = async () => {
  try {
      return await axios.get(`${API_URL}/anuncios`).then(res => {
          return res.data.result;
      });
  }catch (e) {
      console.log(e.message);
      throw new Error(e.message);
  }
};

const TIMEOUT = 500;

const loading = (config = {}) => () => {
  const {result = undefined,timeout = TIMEOUT,} = config;
  return new Promise((resolve, reject) => {
    setTimeout(() => {    
      resolve(result);
    }, timeout);
  });
};

const getAllADS = ADS;

export default {
   ADS,
   getAllADS,
   checkoutCart: loading({
    timeout: TIMEOUT ,
  }),
   addToCart: loading({
    timeout: TIMEOUT,
  }),
  removeFromCart: loading({
    timeout: TIMEOUT,
  }),


};
