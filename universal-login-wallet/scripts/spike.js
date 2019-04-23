const WyreClient = require('@wyre/api').WyreClient;

const WYRE_TEST_API = 'https://api.testwyre.com';
const WYRE_API = 'https://api.sendwyre.com';

const wyre = new WyreClient({ format: 'json_numberstring', apiKey: 'AK-9F9MDBJ7-GGM9VUGT-8FM349EY-79GJBNFH', secretKey: 'SK-NYPHV84Y-JUCU8TXQ-R26JBGMB-LM3FUXZ6', baseUrl: WYRE_TEST_API});

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
    "publicToken": "public-sandbox-c78b1564-44c9-426a-9ea3-3fdadcba2e10|AGdQ3KZwl9tdaedkMZAduw8vJD5GvyU1N48Zj",
    "paymentMethodType": "LOCAL_TRANSFER",
    "country": "US"
  };

  wyre.post('/v2/paymentMethods', exampleJSON).then((result) => {
    console.log(result);
  }, err => {
    console.log(err);
  });
}


getAccount();