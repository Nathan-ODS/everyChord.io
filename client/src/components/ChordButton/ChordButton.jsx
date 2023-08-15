import React from 'react';
import './ChordButton.css';

const ChordButton = ({
    label = 'label',
    onClick,
    isActive = false,
}) => {
    const className = isActive ? 'chord-button active' : 'chord-button'

    return (
        <div className={className} onClick={onClick}>
           {label}
        </div>
    )
}


export default ChordButton;