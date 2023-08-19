import React from 'react';
import './ChordButton.css';

const ChordButton = ({
    label = 'label',
    onClick,
    isActive = false,
    className = 'chord-button'
}) => {
    if(isActive) {
        className+= ' active'
    }

    return (
        <div className={className} onClick={onClick}>
           {label}
        </div>
    )
}


export default ChordButton;