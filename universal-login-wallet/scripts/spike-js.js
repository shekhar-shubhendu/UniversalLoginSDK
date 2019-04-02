const WyreClient = require('@wyre/api').WyreClient;

const WYRE_TEST_API = 'https://api.testwyre.com';
const WYRE_API = 'https://api.sendwyre.com';

const wyre = new WyreClient({
  format: 'json_numberstring',
  apiKey: 'AK-GWJMFWA7-43E2YTQG-28NEUVWV-RBLRGUHC',
  secretKey: 'SK-J93RNRUQ-DJJPPHDB-EV2YC9W9-JNTDAEQ8',
  baseUrl: WYRE_TEST_API
});

async function getAccount() {
  try {
    const account = await wyre.get('v2/account');
    console.log('I am Wyre account', account.id);
  } catch (err) {
    console.log('Problems:', err);
  }
}

async function getWallets() {
  try {
    const wallet = await wyre.get('');
  } catch (err) {
    console.log('Problems:', err);
  }
}

async function getListPaymentMethods() {
  const paymentMethods = await wyre.get('/v2/paymentMethods');
  console.log('Payment methods', paymentMethods);
}

getListPaymentMethods();