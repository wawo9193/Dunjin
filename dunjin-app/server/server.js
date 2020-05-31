require('dotenv').config();

var express = require("express");
var app = express();
const cookieParser = require('cookie-parser');
var withAuth = require('./middleware');
var PORT = 4090;

const { 
    receivePublicToken,
    getTransactions,
    getBalance,
    putCat,
    getCat,
    logIn,
    isUser
} = require("../src/controllers/controller");

app.use(express.json());
app.use(cookieParser());

// Get the public token and exchange it for an access token
app.post("/auth/public_token", withAuth, receivePublicToken);// Get Transactions
app.get("/transactions", getTransactions);
app.get("/accounts/balance/get", getBalance);
app.post("/users/login", logIn);
app.post("/categories/post", putCat);
app.get("/categories/get", getCat);
app.get("/auth", withAuth, isUser);
app.get("/logout", (req, res) => {
    res.clearCookie('token').sendStatus(200);
})

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});