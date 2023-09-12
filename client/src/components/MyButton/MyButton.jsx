import React from 'react';
import "./MyButton.css";

const MyButton = ({onClick, label, childElement}) => {
    if (!(label || childElement)) label = 'Default'
    return (
        <span className={'my-button'} onClick={onClick}>
           {label || childElement}
        </span>
    );
}

export default MyButton;