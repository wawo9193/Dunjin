// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

// const express = require("express");
// const app = express();
// const PORT = 4090;

// app.use(express.json());
// app.listen(PORT, () => {
//     console.log(`Server running on ${PORT}`);
// });

const express = require("express");
const app = express();
const PORT = 4090;

const {
    receivePublicToken,
    getTransactions
} = require("./server/controllers/controller");

app.use(express.json());// Get the public token and exchange it for an access token
app.post("/auth/public_token", receivePublicToken);// Get Transactions
app.get("/transactions", getTransactions);

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});