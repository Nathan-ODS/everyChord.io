import React from 'react';
import ChordButton from '../../ChordButton/ChordButton';
import './ChordType.css';

const ChordType = ({ types, typesLabels, activeType, activeRoot, onChangeType }) => (
  <div className='chord-types'>
    {types.map((type) => (
      <ChordButton
        key={type}
        label={activeRoot + typesLabels[type]}
        isActive={type === activeType}
        onClick={() => onChangeType(type)}
      />
    ))}
  </div>
);

export default ChordType;