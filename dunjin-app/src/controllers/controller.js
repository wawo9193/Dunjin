
var plaid = require("plaid");
var moment = require("moment");

var PLAID_CLIENT_ID = "5e5fdfd57fe8f6001127093a";
var PLAID_SECRET = "6d6c5d4ea10908e333e273d193bfce";
var PLAID_PUBLIC_KEY = "c46bbe6410966ad208a81aa46d28f7";
var PLAID_ENV = "sandbox";

var ACCESS_TOKEN = null;
var PUBLIC_TOKEN = null;
var ITEM_ID = null;

// Initialize the Plaid client
var client = new plaid.Client(
  PLAID_CLIENT_ID,
  PLAID_SECRET,
  PLAID_PUBLIC_KEY,
  plaid.environments[PLAID_ENV],
  { version: "2019-05-29", clientApp: "Plaid Quickstart" }
);

const receivePublicToken = (req, res) => {
  // First, receive the public token and set it to a variable
  let PUBLIC_TOKEN = req.body.public_token;
  // Second, exchange the public token for an access token
  client.exchangePublicToken(PUBLIC_TOKEN, function(error, tokenResponse) {
    ACCESS_TOKEN = tokenResponse.access_token;
    ITEM_ID = tokenResponse.item_id;
    res.json({
      access_token: ACCESS_TOKEN,
      item_id: ITEM_ID
    });
    console.log("access token below");
    console.log(ACCESS_TOKEN);
  });
};

const getTransactions = (req, res) => {
  // Pull transactions for the last 30 days
  console.log("in here?")
  let startDate = moment()
    .subtract(30, "days")
    .format("YYYY-MM-DD");
  let endDate = moment().format("YYYY-MM-DD");
  console.log("made it past variables");
  client.getTransactions(
    ACCESS_TOKEN,
    startDate,
    endDate,
    {
      count: 250,
      offset: 0
    },
    function(error, tRes) {
      res.json({ transactions: tRes });
    //   console.log(tRes);
        // console.log(tRes);
        // // console.log("****************")
        // // console.log(tRes['transactions'][0]['name']);
        // // console.log("****************")
        // var n = tRes['total_transactions']
        // for (var i=0; i<n; i++) {
        //     console.log(tRes['transactions'][i]['name'] + ' - ' + tRes['transactions'][i]['amount']);
        // }
    }
  );
};

module.exports = {
  receivePublicToken,
  getTransactions
};
