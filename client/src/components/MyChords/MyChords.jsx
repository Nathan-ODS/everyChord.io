import React from 'react';
import "./MyChords.css"

const MyChords = ({ activeChord, onChordChange }) => {
    const chords = ["C", "A", "D", "G"];

    const handleChordClick = (chord) => {
        onChordChange(chord)
    }

    return (
        <div className='my-chords'>
            {chords.map((chord) => (
                <button
                    key={chord}
                    onClick={() => handleChordClick(chord)}
                    className={activeChord === chord ? "active" : ""}
                >
                    {chord}
                </button>
            ))}
        </div>
    )
}

export default MyChords