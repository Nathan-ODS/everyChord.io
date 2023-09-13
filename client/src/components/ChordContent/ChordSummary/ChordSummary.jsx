import React from "react";
import "./ChordSummary.css";

const ChordSummary = ({ activeNotes, activeMidiChord, activeChordLabel }) => {
    return (
        <div className="chord-summary">
            <p>{activeNotes}</p>
            <p>{activeMidiChord}</p>
            <p>{activeChordLabel}</p>
        </div>
    )
}

export default ChordSummary;