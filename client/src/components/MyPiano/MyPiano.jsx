import React, { useState, useEffect } from "react";
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

  const [activeMidiNotes, setActiveMidiNotes] = useState([]);
  const [activeNotes, setActiveNotes] = useState([]);

  useEffect(() => {
    async function fetchChord() {
      try {
        const res = await fetch(`/api/chord/${activeChord}`);
        const data = await res.json();

        setActiveMidiNotes(data.midiNotes);
        setActiveNotes(data.notes);
      } catch (error) {
        console.error("Error fetching", error);
        setActiveNotes([]);
        setActiveMidiNotes([]);
      }
    }

    fetchChord();
  }, [activeChord])

  return (
    <div className="my-piano">
      <span>{activeMidiNotes}</span>
      <span>{activeNotes}</span>
      <span className="chord-name">{activeChord}</span>
      <Piano
        noteRange={noteRange}
        width={700}
        playNote={() => { }}
        stopNote={() => { }}
        activeNotes={activeMidiNotes || []}
        // disabled={true}
      />
    </div>
  );
}

export default MyPiano;
