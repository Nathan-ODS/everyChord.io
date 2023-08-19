import React from 'react';

const ChordBubble = ({chord, onClick}) => (
    <div className='bubble chord-bubble' onClick={onClick}>
        {chord}
    </div>
);

export default ChordBubble;