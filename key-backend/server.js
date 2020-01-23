const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const uri = process.env.ATLAS_URI;

// Using this instead of bodyparser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true})     // connects us to the database
    .then((res) => {
        console.log('success connecting to DB');
    })
    .catch((err) => {
        console.log('error is ' + err);
    });

app.listen(process.env.port || 5000, function(req,res) {
    console.log("Connection success!");
});