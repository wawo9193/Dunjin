
import React, { Component } from "react";
// import PlaidLink from "react-plaid-link";
// import axios from "axios";
function format(input) {
    return (input<0) ? "-$"+Math.abs(input).toFixed(2) : "$"+input.toFixed(2);
}

const Net = (props) => {
    console.log(props);
    return(
        <div>
            <p style={{width: "50%"}}>Income: {format(props.income)}</p>
            <p style={{width: "50%"}}>Expense: {format(props.expense)}</p>
        </div>
    );
}

export default Net;
