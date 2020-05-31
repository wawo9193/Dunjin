
import React from "react";
import "./stylesheets/Bal.css";

// function format(input) {
//     return (input<0) ? "-$"+Math.abs(input).toFixed(2) : "$"+input.toFixed(2);
// }

const Bal = (props) => {
    var networth = 0;
    props.balance.map(item => networth+=item.current);

    return(
            <div className="bgTable">
                <div style={{marginTop:"5px", display:"inline-block"}}>
                    <table className="netable">
                        <tr>
                            <th>subtype</th>
                            <th>name</th>
                            <th>available ($)</th>
                            <th>current ($)</th>
                        </tr>
                        {props.balance.map(item => (
                            <tr>
                                <td>{item.subtype}</td>
                                <td>{item.name}</td>
                                <td>{item.available === null ? 0.00 : item.available.toFixed(2)}</td>
                                <td>{item.current.toFixed(2)}</td>
                            </tr>
                        ))}
                        <tr>
                            <td>Net worth total:</td>
                            <td>-</td>
                            <td>0</td>
                            <td>{networth.toFixed(2)}</td>
                        </tr>
                    </table>
                </div>
            </div>
    );
}

        // <p style={{width:"50%"}}>30 day balance:{props.accounts[0].name}</p>
        //     <p style={{width: "50%"}}>
        //         Total Income: { format(props.income.reduce(function(acc,elt) {
        //             if (elt.amount>0) {
        //                 return acc + elt.amount;
        //             } else {
        //                 return acc;
        //             }
        //         },0))}
        //     </p>
        //     <p style={{width: "50%"}}>
        //         Total Expenses: { format(props.income.reduce(function(acc,elt) {
        //             if (elt.amount<0) {
        //                 return acc + elt.amount;
        //             } else {
        //                 return acc;
        //             }
        //         },0))}
        //                 // </p>

export default Bal;
