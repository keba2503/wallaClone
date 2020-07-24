'use strict';

const ADSS_TYPES = {
  ELECTRONIC: 'electronic',
  LIFESTYLE: 'lifestyle',
  MOBILE: 'mobile'
 };
 


require('dotenv').config();

const conn = require('./lib/connectMongoose');
const Anuncios = require('./models/Anuncios');
const Users = require('./models/Users');


conn.once('open', async () => {
    try {
  
      await initAnuncios();
      await initUsers();
      conn.close();
  
    } catch(err) {
      console.error('error:', err);
      process.exit(1);
    }
  });

async function initAnuncios() {
    await Anuncios.deleteMany();
    await Anuncios.insertMany([
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
    ]);
  }

  async function initUsers() {
    await Users.deleteMany(); 
    await Users.insertMany([
      {
        username: 'example',
        email: 'user@example.es',
        password:  await Users.hashPassword('1234'),
      },
      {
        username: 'keba2503',
        email: 'keba2503@gmail.com',
        password: await Users.hashPassword('1234'),
      }
    ]);
  }

