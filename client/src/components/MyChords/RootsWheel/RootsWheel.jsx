import React from 'react';
import ChordButton from '../../ChordButton/ChordButton';

const RootsWheel = ({ roots, activeRoot, onChangeRoot }) => (
    <div className='roots-wheel'>
        {roots.map((root) => (
            <ChordButton
                key={root}
                isActive={activeRoot === root}
                label={root}
                onClick={() => onChangeRoot(root)}
            />
        ))}
    </div>
);

export default RootsWheel;