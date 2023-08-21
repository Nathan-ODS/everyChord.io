import React, { useState, useEffect } from "react";
import { Piano, MidiNumbers } from 'react-piano';
import 'react-piano/dist/styles.css';
import "./MyPiano.css";

const MyPiano = ({activeChord}) => {
  // piano range config
  const firstNote = MidiNumbers.fromNote('f3');
  const lastNote = MidiNumbers.fromNote('c6');

  const noteRange = {
    first: firstNote,
    last: lastNote,
  };

  // react hooks
  const [activeNotes, setActiveNotes] = useState([]);
  const [activeMidiChord, setActiveMidiChord] = useState([]);

  useEffect(() => {
    async function fetchChord() {
      try {
        const res = await fetch(`/api/chord/${activeChord?.root}/${activeChord?.type}`);
        const data = await res.json();

        setActiveNotes(data.notes);
        setActiveMidiChord(data.midiChord);
      } catch (error) {
        console.error("Error fetching", error);
        setActiveNotes([]);
        setActiveMidiChord([]);
      }
    }

    if(activeChord) fetchChord();
  }, [activeChord])

  return (
    <div className="my-piano">
      <Piano
        noteRange={noteRange}
        width={700}
        playNote={() => { }}
        stopNote={() => { }}
        activeNotes={activeMidiChord}
      />
      <span className="chord-notes">
        {activeNotes.map((note) => <p key={note}>{note}</p>)}
      </span>
    </div>
  );
}

export default MyPiano;
