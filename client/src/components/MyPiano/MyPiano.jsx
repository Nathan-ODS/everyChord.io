import React, { useState, useEffect } from "react";
import { Piano, MidiNumbers } from 'react-piano';
import { SplendidGrandPiano, CacheStorage } from "smplr";
import debounce from 'lodash/debounce';

import MyButton from "../MyButton/MyButton";
import 'react-piano/dist/styles.css';
import "./MyPiano.css";
import { FaSpinner } from "react-icons/fa";


const MyPiano = ({ activeChord }) => {
  const [pianoAudio, setPianoAudio] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [activeNotes, setActiveNotes] = useState([]);
  const [activeMidiChord, setActiveMidiChord] = useState([]);

  const firstNote = MidiNumbers.fromNote('f3');
  const lastNote = MidiNumbers.fromNote('c6');

  const noteRange = {
    first: firstNote,
    last: lastNote,
  };

  // Piano Audio setup
  useEffect(() => {
    async function setupPianoAudio() {
      try {
        const context = new AudioContext();
        const storage = new CacheStorage();
        const pianoInstance = await new SplendidGrandPiano(context, { storage }).loaded();
        setPianoAudio(pianoInstance);
      } catch (error) {
        console.error('Error setting up piano:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!pianoAudio && isLoading) {
      setupPianoAudio();
    }
  }, [pianoAudio, isLoading]);


  // Fetch chord object
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

  // Play Piano sound  
  useEffect(() => {
    function playPiano() {
      activeNotes.forEach((note) => {
        pianoAudio.start({ note: note, velocity: 50 });
      });
    };
  
    const debouncedPlayPiano = debounce(() => {
      if (activeNotes && pianoAudio) {
        playPiano();
      }
    }, 30);
  
    debouncedPlayPiano();
  
    // Cleanup the debounced function on component unmount
    return () => {
      debouncedPlayPiano.cancel();
    };
  }, [activeNotes, pianoAudio]);

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
      {!pianoAudio
        && <div className="load-button-container">
        {
          !isLoading 
            ? <MyButton 
                label={'Load piano audio'}
                onClick={() => {
                  setIsLoading(true);
                }} />
            : <MyButton childElement={<FaSpinner className="spinner" />} />
        }
        </div>
      }
    </div>
  );
}

export default MyPiano;
