import React from "react";
import { Piano, MidiNumbers } from 'react-piano';
import 'react-piano/dist/styles.css';
import "./MyPiano.css";

const MyPiano = ({activeChord}) => {
  const firstNote = MidiNumbers.fromNote('c3');
  const lastNote = MidiNumbers.fromNote('c5');

  const noteRange = {
    first: firstNote,
    last: lastNote,
  };

  const getActiveNotes = (activeChord) => {
    if(activeChord === "C") {
      return [60,64,67]
    }

    return []
  }

  return (
    <div className="my-piano">
      <span className="chord-name">{activeChord}</span>
      <Piano
        noteRange={noteRange}
        width={700}
        playNote={(MidiNumbers) => {console.log(MidiNumbers)}}
        stopNote={(MidiNumbers) => { }}
        activeNotes={getActiveNotes(activeChord)}
      // disabled={false}
      />
    </div>
  );
}

export default MyPiano;
