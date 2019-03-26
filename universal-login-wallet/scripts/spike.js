const WyreClient = require('@wyre/api').WyreClient;

const WYRE_TEST_API = 'https://api.testwyre.com'

const wyre = new WyreClient({ format: 'json_numberstring', apiKey: 'AK-AAAAAAA-AAAAAAA-AAAAAAA-AAAAAAA', secretKey: 'SK-AAAAAAA-AAAAAAA-AAAAAAA-AAAAAAA', baseUrl: WYRE_TEST_API});


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

wyre.get('/v2/account').then(account => {
  console.log(account);
}, err => {
  console.log(err);
})

console.log();