import React from "react";
import "./ChordSummary.css";

const ChordSummary = ({ activeNotes, activeMidiChord, activeChordLabel }) => {

    return (
        <div className="chord-summary">
            <div className="label">
                <span>{activeChordLabel}</span>
            </div>
            <div className="notes">
                <span>{activeNotes}</span>
                <span>{activeMidiChord}</span>
            </div>
        </div>
    )
}

export default ChordSummary;