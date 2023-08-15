import React from "react";
import { Piano, MidiNumbers } from 'react-piano';
import 'react-piano/dist/styles.css';
import "./MyPiano.css";

const MyPiano = () => {
  const firstNote = MidiNumbers.fromNote('c3');
  const lastNote = MidiNumbers.fromNote('c5');

  const noteRange = {
    first: firstNote,
    last: lastNote,
  };

  return (
    <div className="my-piano">
      <Piano
        noteRange={noteRange}
        width={700}
        playNote={(MidiNumbers) => { }}
        stopNote={(MidiNumbers) => { }}
      // disabled={false}
      />
    </div>
  );
}

export default MyPiano;
