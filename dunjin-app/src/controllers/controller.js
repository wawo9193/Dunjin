
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
        console.log(bres);
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
            bcrypt.hash(pass, salt, (err, hash) => {
                con.query("SELECT * FROM userDb.users WHERE email=?",email,(error, results) => {
                    if (!error) {
                        // console.log(results[0].email);
                        const storedHash = results[0].password;
                        // Load hash from the db, which was preivously stored 
                        bcrypt.compare(pass, storedHash, function(err, isUser) {
                            if (isUser == true) { // PW Match
                                const authToken = jwt.sign({ email: email, password: pass }, jwtSecret);
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
        });
    } else if (clicked == 'Signup') {
        console.log("signup");
        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(pass, salt, (err, hash) => {
                con.query("SELECT * FROM userDb.users WHERE email=?",email,(error, results) => {
                    if (!error) {
                        if (results == '') {
                            // Signup
                            con.query("INSERT INTO userDb.users (email,password,itemID,token,tokenType) VALUES (?,?,NULL,NULL,NULL)", [email,pass]);
                            res.sendStatus(200);
                        } else {
                            console.log(storedEmail + " already exists in the db.");
                        }
                    } else {
                        console.log("query error");
                    }
                });
            });
        });
    }
};

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports = {
    receivePublicToken,
    getTransactions,
    getBalance,
    logIn
};
