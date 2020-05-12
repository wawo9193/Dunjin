
var plaid = require("plaid");
var moment = require("moment");
var mysql = require('mysql');
const bcrypt = require('bcrypt');
const saltRounds = 10;

var PLAID_CLIENT_ID = "5e5fdfd57fe8f6001127093a";
var PLAID_SECRET = "6d6c5d4ea10908e333e273d193bfce";
var PLAID_PUBLIC_KEY = "c46bbe6410966ad208a81aa46d28f7";
var PLAID_ENV = "sandbox";

var ACCESS_TOKEN = null;
var PUBLIC_TOKEN = null;
var ITEM_ID = null;

var con = mysql.createConnection({
    host: "localhost",
    user: "wawo9193",
    password: "L337B01"
  });
  
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

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
    PUBLIC_TOKEN = req.body.public_token;
    // Second, exchange the public token for an access token
    client.exchangePublicToken(PUBLIC_TOKEN, function(error, tokenResponse) {
        ACCESS_TOKEN = tokenResponse.access_token;
        ITEM_ID = tokenResponse.item_id;
        res.json({
            access_token: ACCESS_TOKEN,
            item_id: ITEM_ID
        });
        console.log("-> " + ITEM_ID);
        console.log("access token below");
        console.log(ACCESS_TOKEN);
    });
};

const getTransactions = (req, res) => {
    // Pull transactions for the last 30 days
    let startDate = moment()
    .subtract(30, "days")
    .format("YYYY-MM-DD");
    let endDate = moment().format("YYYY-MM-DD");
    client.getTransactions(ACCESS_TOKEN, startDate, endDate, { count: 250, offset: 0 },
        function(error, tRes) {
            res.send(tRes['transactions']);
            console.log("IN CONTROLLER");
        }
    );
};

const getBalance = (req, res) => {
    client.getBalance(ACCESS_TOKEN, (err, bres) => {

        if (err) res.send({checking : 0});

        let n = bres.accounts.length;
        var avail = 0;

        for (var i=0; i<n; i++) {
            avail += (bres.accounts[i].subtype == "checking") ? bres.accounts[i].balances.available : 0;
        }
        res.send({checking : avail});
    });  
};

const logIn = (req, res) => {
    email = req.body.email;
    pass = req.body.password;

    // console.log("email: " + req.body.email + " and pw: " + req.body.password);

    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(pass, salt, (err, hash) => {
            // console.log("Pass:" + pass + " -> Hashed: " + hash);
        });
    });
};

module.exports = {
    receivePublicToken,
    getTransactions,
    getBalance,
    logIn
};
