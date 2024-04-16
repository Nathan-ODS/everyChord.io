import React from "react";
import "./ChordSummary.css";

const ChordSummary = ({ activeNotes, activeChordLabel }) => {
  return (
    <div className="chord-summary">
      {!activeChordLabel.includes("undefined") && (
        <div className="label">
          <span>{activeChordLabel}</span>
        </div>
      )}
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