const fetch = require('node-fetch');

const API = 'https://api.safello.com';

const request = () => {
  fetch('https://api.safello.com/v1/auth/bankid', {
    headers: {
      'app-secret': APP_SECRET,
    }
  });
};

request();
