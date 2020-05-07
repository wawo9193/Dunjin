const express = require("express");
const app = express();
const PORT = 4090;

const { 
    receivePublicToken, 
    getTransactions,
    getBalance
} = require("../src/controllers/controller");

app.use(express.json());

// Get the public token and exchange it for an access token
app.post("/auth/public_token", receivePublicToken);// Get Transactions
app.get("/transactions", getTransactions);
app.get("/accounts/balance/get", getBalance);

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});