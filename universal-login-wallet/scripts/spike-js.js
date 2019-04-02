const WyreClient = require('@wyre/api').WyreClient;

const WYRE_TEST_API = 'https://api.testwyre.com';
const WYRE_API = 'https://api.sendwyre.com';

const account = {
  "type":"INDIVIDUAL",
  "country": "US",
  "subaccount": true,
  "profileFields":[
    {
      "fieldId": "individualLegalName",
      "value": "Johnny Quest"
    },
    {
      "fieldId": "individualEmail",
      "value": "JohnnyQuest22@yolo.com"
    },
    {
      "fieldId": "individualResidenceAddress",
      "value": {
        "street1": "1 Market St",
        "street2": "Suite 402",
        "city": "San Francisco",
        "state": "CA",
        "postalCode": "94105",
        "country": "US"
      }
    }
  ]
};

const wyre = new WyreClient({
  format: 'json_numberstring',
  apiKey: 'AK-GWJMFWA7-43E2YTQG-28NEUVWV-RBLRGUHC',
  secretKey: 'SK-J93RNRUQ-DJJPPHDB-EV2YC9W9-JNTDAEQ8',
  baseUrl: WYRE_TEST_API
});

async function getAccount() {
    const account = await wyre.get('v2/account');
    return account.id;
}

async function createPaymentMethod() {
  return wyre.post('v2/paymentMethods', {
    publicToken: 'public-sandbox-c78b1564-44c9-426a-9ea3-3fdadcba2e10|AGdQ3KZwl9tdaedkMZAduw8vJD5GvyU1N48Zj',
    paymentMethodType: 'LOCAL_TRANSFER',
    country: 'US'
  });
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

async function transfer() {
  
}

async function createAccount() {
  return  wyre.post('v3/accounts', {
    type: 'INDIVIDUAL',
    country: 'PL',
    profileFields: [account]
  });
}

const start = async () => {
  try {
    const result = await createAccount();
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

start();