import React from "react";
import "./ChordSummary.css";

const ChordSummary = ({ activeNotes, activeMidiChord, activeChordLabel }) => {

  return (
    <div className="chord-summary">
      <div className="label">
        <span>{activeChordLabel}</span>
      </div>
      <div className="notes">
        {activeNotes?.map((note, index) => (
            <span key={index}>
              {note}
            </span>
        ))}
      </div>
    </div>
  )
}

export default ChordSummary;