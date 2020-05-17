
import React from "react";
import "./stylesheets/Transact.css";

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