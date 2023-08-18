import React from 'react';
import "./MyChords.css"

import ChordButton from '../ChordButton/ChordButton'

const chords = [
    { root: 'C', type: 'maj', label: 'C' },
    { root: 'C', type: 'min', label: 'Cm' },
    { root: 'E', type: 'maj', label: 'E' },
    { root: 'E', type: 'min', label: 'Em' }
]

const MyChords = ({ activeChord, onChordChange }) => {

    const handleChordClick = (chord) => {
        onChordChange(chord)
    }

    return (
        <div className='my-chords'>
            {chords.map((chord) => (
                <ChordButton
                    key={chord.label}
                    onClick={() => handleChordClick(chord)}
                    label={chord.label}
                    isActive={activeChord === chord ? true : false}
                />
            ))}
        </div>
    )
}

export default MyChords