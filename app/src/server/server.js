// const express = require('express');
// const app = express();
// const mongoose = require('mongoose');
// require('dotenv').config();
// const uri = process.env.ATLAS_URI;

// // Using this instead of bodyparser
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true})     // connects us to the database
//     .then((res) => {
//         console.log('Successfully connected to DB');
//     })
//     .catch((err) => {
//         console.log('error is ' + err);
//     });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, function(req,res) {
//     console.log("Successfully connected to port " + PORT);
// });

const express = require("express");
const app = express();
const PORT = 4090;

const {
    receivePublicToken,
    getTransactions
} = require("./controllers/controller");
    
app.use(express.json());// Get the public token and exchange it for an access token

app.post("/auth/public_token", receivePublicToken);// Get Transactions
app.get("/transactions", getTransactions);

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});