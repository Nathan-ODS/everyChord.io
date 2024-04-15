import React, { useState, useEffect } from "react";
import { Piano, MidiNumbers } from 'react-piano';
import 'react-piano/dist/styles.css';

import ChordSummary from "./ChordSummary/ChordSummary";
import MyButton from "../MyButton/MyButton";
import { useAudio } from "../../contexts/AudioContext";

import { FaSpinner } from "react-icons/fa";


import "./ChordContent.css";


const ChordContent = ({ activeChord }) => {
  const { pianoAudio, lastActiveNotes, isLoading, setupPianoAudio, setLastActiveNotes } = useAudio()
  const [activeMidiChord, setActiveMidiChord] = useState([]);

  const firstNote = MidiNumbers.fromNote('a3');
  const lastNote = MidiNumbers.fromNote('c6');

  const noteRange = {
    first: firstNote,
    last: lastNote,
  };

  // Fetch chord object
  useEffect(() => {
    async function fetchChord() {
      try {
        const res = await fetch(`/api/chord/${activeChord?.root}/${activeChord?.type}`);
        const data = await res.json();
        setLastActiveNotes(data.notes);
        setActiveMidiChord(data.midiChord);
      } catch (error) {
        console.error("Error fetching", error);
        setLastActiveNotes([]);
        setActiveMidiChord([]);
      }
    }

    if (activeChord) {
      fetchChord();
    }
  }, [activeChord, setLastActiveNotes]);

  return (
    <div className="chord-content">
      { activeChord &&
        <ChordSummary activeNotes={lastActiveNotes} activeMidiChord={activeMidiChord} activeChordLabel={activeChord?.label} />
      }

      <div className="piano-container">
        {!pianoAudio
          && <div className="load-button-container">
            {
              <MyButton
                className={isLoading ? 'load-button--loading' : 'load-button'}
                label={!isLoading ? 'Load piano audio' : ''}
                onClick={setupPianoAudio}
                childElement={isLoading ? <FaSpinner className='spinner' /> : undefined}
              />
            }
          </div>
        }
        <Piano
          noteRange={noteRange}
          width={750}
          playNote={() => {}}
          stopNote={() => {}}
          activeNotes={activeMidiChord}
        />
      </div>
    </div>
  );
}

export default ChordContent;
