import React from 'react';
import "./MyButton.css";

const MyButton = ({onClick, label, childElement, className}) => {
    if (!(label || childElement)) label = 'Default'
    return (
        <span className={className ? 'my-button '+className : 'my-button'} onClick={onClick}>
           {label || childElement}
        </span>
    );
}

export default MyButton;