const plaid = require("plaid");
const moment = require("moment");
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET;

var PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
var PLAID_SECRET = process.env.PLAID_SECRET;
var PLAID_PUBLIC_KEY = process.env.PLAID_PUBLIC_KEY;
var PLAID_ENV = process.env.PLAID_ENV;

var ACCESS_TOKEN = null;
var PUBLIC_TOKEN = null;
var ITEM_ID = null;

var con = mysql.createConnection({
    host        : process.env.DB_HOST,
    user        : process.env.DB_USER,
    password    : process.env.DB_PASS
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
        if (error) res.sendStatus(400);
        ACCESS_TOKEN = tokenResponse.access_token;
        ITEM_ID = tokenResponse.item_id;

        con.query("UPDATE userDb.users SET itemID = ?, accessToken = ?, publicToken = ? WHERE email = ?", [ITEM_ID,ACCESS_TOKEN,PUBLIC_TOKEN,req.email]);
        res.sendStatus(200);
    });
};

const getTransactions = (req, res) => {
    // Pull transactions for the last 30 days
    let startDate = moment()
    .subtract(93, "days")
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
        var response = [];
        for (var i in bres.accounts) {
            response.push({
                name: bres.accounts[i].name,
                type: bres.accounts[i].type,
                subtype: bres.accounts[i].subtype,
                available: bres.accounts[i].balances.available,
                current: bres.accounts[i].balances.current
            });
        }
        res.send({response});
    });  
};

const logIn = (req, res) => {
    email = req.body.email;
    pass = req.body.password;
    clicked = req.body.clicked;

    if (clicked == 'Login') {
        con.query("SELECT * FROM userDb.users WHERE email = ?",email,(error, results) => {
            if (!error) {
                const storedHash = results[0].password;
                bcrypt.compare(pass, storedHash, function(err, isUser) {
                    if (isUser == true) { // PW Match
                        const authToken = jwt.sign({ email: email }, jwtSecret);
                        //""
                        res.cookie('token', authToken, { httpOnly: true }).sendStatus(200);
                    } else {
                        res.send('Email or password is incorrect');
                    }                        
                });
            } else {
                console.log("query error");
            }
        });
    } else if (clicked == 'Signup') {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(pass, salt, (err, hash) => {
                con.query("SELECT * FROM userDb.users WHERE email=?",email,(error, results) => {
                    if (!error) {
                        if (results[0] == undefined) {
                            con.query("INSERT INTO userDb.users (email,password,itemID,accessToken,publicToken,tokenType) VALUES (?,?,NULL,NULL,NULL,NULL)", [email,hash]);
                            
                            const authToken = jwt.sign({ email: email }, jwtSecret);
                            res.cookie('token', authToken, { httpOnly: true }).sendStatus(200);
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

const putCat = (req, res) => {
    var category = "";
    for (var name in req.body.cat) {
        category = req.body.cat[name];

        con.query("SELECT * FROM userDb.categories WHERE name=? AND category=?",[name,category],(error, results) => {
            if (results[0]==undefined) {
                con.query("INSERT INTO userDb.categories (name,category,frequency) VALUES (?,?,1)", [name,category]);
            } else {
                con.query("UPDATE userDb.categories SET frequency=? WHERE name=? AND category=?",[results[0].frequency+1,name,category]);
            }
        });
    }
    res.sendStatus(200);
}

const getCat = (req, res) => {
    con.query("SELECT t.name,t.category FROM userDb.categories t CROSS JOIN (SELECT name,MAX(frequency) AS freq FROM userDb.categories GROUP BY name) x on x.freq=t.frequency AND x.name=t.name",(error, results) => {
        if (error) res.sendStatus(400);

        res.status(200).send({ results });
    });
}

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
    putCat,
    getCat,
    logIn,
    isUser
};
