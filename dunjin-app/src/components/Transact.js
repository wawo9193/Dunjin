
import React, { Component } from "react";
import "./Transact.css";
// import PlaidLink from "react-plaid-link";
// import axios from "axios";

const Transact = (props) => {
    console.log(props);
    return(
        <tr>
            <td>{props.t_name}</td>
            <td>{props.t_amount}</td>
            <td>{props.t_date}</td>
        </tr>
    );
}

export default Transact;