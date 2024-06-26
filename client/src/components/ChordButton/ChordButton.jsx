import React from 'react';
import './ChordButton.css';

const ChordButton = ({
    label,
    childElement,
    onClick,
    isActive = false,
    className = 'chord-button'
}) => {
    if(isActive) {
        className+= ' active'
    }

    return (
        <span className={'chord-button '+className} onClick={onClick}>
           {label || childElement}
        </span>
    )
}


export default ChordButton;