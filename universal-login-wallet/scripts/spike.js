const WyreClient = require('@wyre/api').WyreClient;

const WYRE_TEST_API = 'https://api.testwyre.com';
const WYRE_API = 'https://api.sendwyre.com';

const wyre = new WyreClient({ format: 'json_numberstring', apiKey: 'AK-GWJMFWA7-43E2YTQG-28NEUVWV-RBLRGUHC', secretKey: 'SK-J93RNRUQ-DJJPPHDB-EV2YC9W9-JNTDAEQ8', baseUrl: WYRE_TEST_API});

const createAccountBody = {
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

function getAccount() {
  wyre.get('/v2/account').then((account) => {
    console.log(account);
  }, err => {
    console.log(err);
  });
}

function getWallets() {
  wyre.get('/v2/wallets').then((account) => {
    console.log(account);
  }, err => {
    console.log(err);
  });
}

function getRates() {
  wyre.get('/v2/rates').then((result) => {
    console.log(result);
  }, err => {
    console.log(err);
  });
}

function getBankInfo() {
  wyre.get('/v2/bankinfo/UK')
      .then((result) => {console.log(result)}, err => {
        console.log(err);
      });
}

function createPaymentMethod() {
  const exampleJSON = {
    "publicToken": "public-sandbox-84bdd046-51cb-4bbe-88a4-4db7195519d2|zWb4oeqB6PS3n1D64N4mhkBeomzkBJfoyr77e",
    "paymentMethodType": "LOCAL_TRANSFER",
    "country": "US"
  };

  wyre.post('/v2/paymentMethods', exampleJSON).then((result) => {
    console.log(result);
  }, err => {
    console.log(err);
  });
}

const paymentMethodId = 'PA_3BQEF24CT4C';




function createTransfer() {
  const transferJSON = {
    "source":"account:AC_ZMQDYZ3JQJ4",
    "sourceCurrency":"USD",
    "sourceAmount":"1",
    "dest":"ethereum:0xE0f31f613862C36F4b49Cb75dDa3f586AdF5a93b",
    "destCurrency":"ETH",
    "message": "Payment for DorianNakamoto@sendwyre.com",
    "autoConfirm":true
  }
  wyre.post('/v3/transfers', transferJSON).then((result) => {
    console.log(result);
  }, err => {
    console.log('error', err);
  })
}




createTransfer();