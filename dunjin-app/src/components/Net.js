
import React from "react";

function format(input) {
    return (input<0) ? "-$"+Math.abs(input).toFixed(2) : "$"+input.toFixed(2);
}

const Net = (props) => {
    console.log(props);
    return(
        <div>
            <p style={{width: "50%"}}>Total Income: {format(props.income)}</p>
            <p style={{width: "50%"}}>Total Expenses: {format(props.expense)}</p>
        </div>
    );
}

export default Net;
