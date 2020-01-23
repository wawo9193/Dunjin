const express = require('express');
const app = express();

// Using this instead of bodyparser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(process.env.port || 5000, function(req,res) {
    console.log("Connection success!");
});