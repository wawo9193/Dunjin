import React from 'react';
import "./stylesheets/Modal.css";

const Modal = ({handleClose, show, children, title}) => {
    const showHideClassName = show ? "modal" : "display-none";

    if(!show){
        return null;
    }
    return (
        <div className={showHideClassName}>
            <div class="modal-content">
                <span class="close" onClick={handleClose}>&times;</span>
                <h2 class="modal-header">{title}</h2>
                {children}
            </div>
        </div>
    );
}

export default Modal;
