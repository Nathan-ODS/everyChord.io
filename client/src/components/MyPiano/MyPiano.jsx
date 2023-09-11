import React, { useState, useEffect } from "react";
import { Piano, MidiNumbers } from 'react-piano';
import { SplendidGrandPiano, CacheStorage } from "smplr";
import 'react-piano/dist/styles.css';
import "./MyPiano.css";

const LoadPianoAudioButton = ({ onClick }) => (
  <div className='load-piano-button'>
    <button onClick={onClick}>Load Piano</button>
  </div>
);

const MyPiano = ({ activeChord }) => {
  const [pianoAudio, setPianoAudio] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [activeNotes, setActiveNotes] = useState([]);
  const [activeMidiChord, setActiveMidiChord] = useState([]);

  const firstNote = MidiNumbers.fromNote('f3');
  const lastNote = MidiNumbers.fromNote('c6');

  const noteRange = {
    first: firstNote,
    last: lastNote,
  };

  // Piano Audio setup
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

  // Change Piano Audio Loading
  useEffect(() => {
    if (!pianoAudio) {
      // Piano is not loaded, so show a "Load Piano" button
      setIsLoading(true);
    }
  }, [pianoAudio]);

  function handleLoadPiano() {
    setIsLoading(true);
    setupPiano();
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
    }
  }, [activeChord, pianoAudio]);

  useEffect(() => {
    function playChord(activeNotes) {
      if (pianoAudio) {
        activeNotes.forEach((note) => {
          pianoAudio.start({ note: note, velocity: 50 });
        });
      }
    };
    if (activeNotes && pianoAudio) {
      pianoAudio.stop()
      playChord(activeNotes)
    }
  },[activeNotes, pianoAudio]);

  return (
    <div className="my-piano">
      <Piano
        noteRange={noteRange}
        width={700}
        playNote={( ) => { }}
        stopNote={( ) => { }}
        activeNotes={activeMidiChord}
      />
      <span className="chord-notes">
        {activeNotes.map((note) => <p key={note}>{note}</p>)}
      </span>
      <p>{isLoading ? 'loading...' : 'loaded'}</p>
      {!pianoAudio && <LoadPianoAudioButton onClick={handleLoadPiano} />}
    </div>
  );
}

export default MyPiano;
