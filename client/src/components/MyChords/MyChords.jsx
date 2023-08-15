import React from 'react';
import "./MyChords.css"

import ChordButton from '../ChordButton/ChordButton'

const MyChords = ({ activeChord, onChordChange }) => {
    const chords = ["C", "A", "D", "G"];

    const handleChordClick = (chord) => {
        onChordChange(chord)
    }

    return (
        <div className='my-chords'>
            {chords.map((chord) => (
                <ChordButton
                    key={chord}
                    onClick={() => handleChordClick(chord)}
                    label={chord}
                    isActive={activeChord === chord ? true : false}
                />
            ))}
            <ChordButton
                    onClick={() => { }}
                />
        </div>
    )
}

export default MyChords