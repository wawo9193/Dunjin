
var plaid = require("plaid");
var moment = require("moment");

var PLAID_CLIENT_ID = "5e5fdfd57fe8f6001127093a";
var PLAID_SECRET = "6d6c5d4ea10908e333e273d193bfce";
var PLAID_PUBLIC_KEY = "c46bbe6410966ad208a81aa46d28f7";
var PLAID_ENV = "sandbox";

var ACCESS_TOKEN = null;
// var ASSET_REPORT_TOKEN = null;
var PUBLIC_TOKEN = null;
// var ASSET_REPORT_ID = null;
var ITEM_ID = null;

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
        console.log("access token below");
        console.log(ACCESS_TOKEN);
    });
};

// const receiveReportToken = (req, res) => {
//     const daysRequested = 60;
//     const options = {
//         client_report_id: '123',
//         webhook: 'https://www.example.com',
//         user: {
//         client_user_id: '789',
//         first_name: 'Jane',
//         middle_name: 'Leah',
//         last_name: 'Doe',
//         ssn: '123-45-6789',
//         phone_number: '(555) 123-4567',
//         email: 'jane.doe@example.com',
//         },
//     };

//     // ACCESS_TOKENS is an array of Item access tokens.
//     // Note that the assets product must be enabled for all Items.
//     // All fields on the options object are optional.
//     client.createAssetReport(ACCESS_TOKEN, daysRequested, options=null, (error, createResponse) => {
//         if (error != null) {
//             console.log("Create Report Error: " + error);
//             return;
//         }

//         ASSET_REPORT_ID = createResponse.asset_report_id;
//         ASSET_REPORT_TOKEN = createResponse.asset_report_token;

//         res.json({
//             asset_report_token: ASSET_REPORT_TOKEN,
//             assetReportId: ASSET_REPORT_ID
//         });
//         console.log("access report token below");
//         console.log(ACCESS_REPORT_TOKEN);
//     });
// }

const getTransactions = (req, res) => {
    // Pull transactions for the last 30 days
    let startDate = moment()
    .subtract(60, "days")
    .format("YYYY-MM-DD");
    let endDate = moment().format("YYYY-MM-DD");
    //   console.log("made it past variables");
    client.getTransactions(ACCESS_TOKEN, startDate, endDate, { count: 250, offset: 0 },
        function(error, tRes) {
            res.send(tRes['transactions']);
            console.log("IN CONTROLLER");
        }
    );
};

const getBalance = (req, res) => {
    // console.log("in balance");
    client.getBalance(ACCESS_TOKEN, (err, bres) => {
        // const accounts = res.accounts;
        if (err) res.send({checking : 0});
        // console.log(bres);
        let n = bres.accounts.length;
        var avail = 0;
        for (var i=0; i<n; i++) {
            // console.log(bres.accounts[i].balances);
            avail += (bres.accounts[i].subtype == "checking") ? bres.accounts[i].balances.available : 0;
        }
        // console.log(avail + " is how much available in checking");
        res.send({checking : avail});
    });  
};

// const getHistory = (req,res) => {
//     client.getAssetReport(ASSET_REPORT_TOKEN, false, (error, getResponse) => {
//         if (error != null) {
//             if (error.status_code === 400 && error.error_code === 'PRODUCT_NOT_READY') {
//                 console.log("Asset report is not ready yet. Try again later.");
//                 return;
//             } else {
//                 console.log("Retrieve Report Error: ", error);
//                 return;
//             }
//         }

//         const report = getResponse.report;
//         console.log("ASSETREPORT");
//         console.log(report);
//     });
// };



module.exports = {
    receivePublicToken,
    // receiveReportToken,
    getTransactions,
    getBalance
    // getHistory
};
