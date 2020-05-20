var plaid = require("plaid");
var moment = require("moment");
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const jwtSecret = 'milleniumfalcon';
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
    console.log("DB Connected!");
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

        con.query("UPDATE userDb.users SET itemID = ?, accessToken = ?, publicToken = ? WHERE email = ?", [ITEM_ID,ACCESS_TOKEN,PUBLIC_TOKEN,req.email]);

        res.json({
            access_token: ACCESS_TOKEN,
            item_id: ITEM_ID
        });
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
    clicked = req.body.clicked;
    
    if (clicked == 'Login') {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            con.query("SELECT * FROM userDb.users WHERE email = ?",email,(error, results) => {
                if (!error) {
                    const storedHash = results[0].password;
                    bcrypt.compare(pass, storedHash, function(err, isUser) {
                        if (isUser == true) { // PW Match
                            const authToken = jwt.sign({ email: email }, jwtSecret);
                            res.cookie('token', authToken, { httpOnly: true }).sendStatus(200);
                        } else {
                            res.send('Email or password is incorrect');
                        }                        
                    });
                } else {
                    console.log("query error");
                }
            });
        });
    } else if (clicked == 'Signup') {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(pass, salt, (err, hash) => {
                con.query("SELECT * FROM userDb.users WHERE email=?",email,(error, results) => {
                    if (!error) {
                        if (results[0] == undefined) {
                            // Signup
                            con.query("INSERT INTO userDb.users (email,password,itemID,accessToken,publicToken,tokenType) VALUES (?,?,NULL,NULL,NULL,NULL)", [email,hash]);
                            res.sendStatus(200);
                        } else {
                            console.log(email + " already exists in the db.");
                        }
                    } else {
                        console.log("query error");
                    }
                });
            });
        });
    }
};

const isUser = (req, res) => {
    con.query("SELECT * FROM userDb.users WHERE email = ?", req.email, (error, results) => {
        if (!error) {
            if (results[0].itemID == undefined) {
                res.sendStatus(400);
            } else {
                ITEM_ID = results[0].itemID;
                ACCESS_TOKEN = results[0].accessToken;
                res.sendStatus(202);
            }
        } else {
            res.sendStatus(401);
        }
    });
}

module.exports = {
    receivePublicToken,
    getTransactions,
    getBalance,
    logIn,
    isUser
};
