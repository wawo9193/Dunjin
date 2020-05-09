import React, { Component } from 'react';
import "./Modal.css";

const Modal = ({handleClose, show, children}) => {
    const showHideClassName = show ? "modal" : "display-none";

    if(!show){
        return null;
    }
    return (
        <div className={showHideClassName}>
            <div class="modal-content">
                <span class="close" onClick={handleClose}>&times;</span>
                <h2 class="modal-header">About</h2>
                <p>This is a dashboard where you can connect to a bank using
                    the Plaid API and display transactions from the previous 30 days.
                </p>
            </div>
        </div>
    );
}

export default Modal;

// Modal.propTypes = {
//     onClose: PropTypes.func.isRequired,
//     show: PropTypes.bool.isRequired
// };