import React, { useState, useEffect } from "react";
import { Piano, MidiNumbers } from 'react-piano';
import { SplendidGrandPiano, CacheStorage } from "smplr";
import 'react-piano/dist/styles.css';
import "./MyPiano.css";

const MyPiano = ({ activeChord }) => {
  const [pianoAudio, setPianoAudio] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [activeNotes, setActiveNotes] = useState([]);
  const [activeMidiChord, setActiveMidiChord] = useState([]);

  const setupPiano = async () => {
    try {
      const context = new AudioContext();
      const storage = new CacheStorage();
      const pianoInstance = await new SplendidGrandPiano(context, { storage }).loaded();

      setPianoAudio(pianoInstance);
      setIsLoading(false);
    } catch (error) {
      console.error('Error setting up piano:', error);
    }
  };

  useEffect(() => {
    if (!pianoAudio) {
      // Piano is not loaded, so show a "Load Piano" button
      setIsLoading(true);
    } else {
      // Piano is loaded, you can start playing notes here if needed
      // For example, playChord(activeChord);
    }
  }, [pianoAudio]);

  const playChord = (activeChord) => {
    // Example: Play a chord with a specific note, velocity, time, and duration
    if (pianoAudio) {
      pianoAudio.start({ note: "C4", velocity: 80, time: 5, duration: 1 });
    }
  };

  const handleLoadPiano = () => {
    console.log('yes')
    setIsLoading(true);
    setupPiano();
  };

  const firstNote = MidiNumbers.fromNote('f3');
  const lastNote = MidiNumbers.fromNote('c6');

  const noteRange = {
    first: firstNote,
    last: lastNote,
  };

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

    if (activeChord) {
      fetchChord();
      if (pianoAudio) playChord(activeChord);
    }
  }, [activeChord, pianoAudio]);

  return (
    <div className="my-piano">
      <Piano
        noteRange={noteRange}
        width={700}
        playNote={() => { pianoAudio?.start({ note: "C4", velocity: 80, time: 5, duration: 1 }); }}
        stopNote={() => { }}
        activeNotes={activeMidiChord}
      />
      <span className="chord-notes">
        {activeNotes.map((note) => <p key={note}>{note}</p>)}
      </span>
      <p>{isLoading ? 'loading...' : 'loaded'}</p>
      {!pianoAudio && <button onClick={handleLoadPiano}>Load Piano</button>}
    </div>
  );
}

export default MyPiano;
