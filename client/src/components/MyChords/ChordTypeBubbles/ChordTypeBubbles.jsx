import React from 'react';
import ChordButton from '../../ChordButton/ChordButton';

const ChordTypeBubble = ({types, typesLabels, activeType, activeRoot, onChangeType }) => (
    <div className='bubble chord-types'>
       {types.map((type)=> (
        <ChordButton 
            key={type}
            label={activeRoot+typesLabels[type]}
            isActive={type === activeType}
            onClick={() => onChangeType(type)}
        />
       ))} 
    </div>
);

export default ChordTypeBubble;