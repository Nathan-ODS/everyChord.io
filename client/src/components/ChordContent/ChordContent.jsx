import React, { useState, useEffect } from "react";
import { Piano, MidiNumbers } from 'react-piano';
import { SplendidGrandPiano, CacheStorage } from "smplr";
import debounce from 'lodash/debounce';

import MyButton from "../MyButton/MyButton";
import 'react-piano/dist/styles.css';
import "./ChordContent.css";
import { FaSpinner } from "react-icons/fa";
import ChordSummary from "./ChordSummary/ChordSummary";


const ChordContent = ({ activeChord }) => {
  const [pianoAudio, setPianoAudio] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [activeNotes, setActiveNotes] = useState([]);
  const [activeMidiChord, setActiveMidiChord] = useState([]);

  const firstNote = MidiNumbers.fromNote('a3');
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
        pianoAudio.stop()
        playPiano();
      }
    }, 100);

    debouncedPlayPiano();

    // Cleanup the debounced function on component unmount
    return () => {
      debouncedPlayPiano.cancel();
    };
  }, [activeNotes, pianoAudio]);

  return (
    <div className="chord-content">
      <ChordSummary activeNotes={activeNotes} activeMidiChord={activeMidiChord} activeChordLabel={activeChord?.label}/>

      <div className="piano-container">
      {!pianoAudio
        && <div className="load-button-container">
          {
            <MyButton
              className={isLoading ? 'load-button--loading' : 'load-button'}
              label={!isLoading ? 'Load piano audio' : ''}
              onClick={() => {
                setIsLoading(true)
              }}
              childElement={isLoading ? <FaSpinner className='spinner' /> : undefined}
            />
          }
        </div>
      }
        <Piano
          noteRange={noteRange}
          width={750}
          playNote={() => { }}
          stopNote={() => { }}
          activeNotes={activeMidiChord}
        />
      </div>
    </div>
  );
}

export default ChordContent;
