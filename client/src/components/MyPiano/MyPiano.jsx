import React, { useState, useEffect } from "react";
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import 'react-piano/dist/styles.css';
import { SplendidGrandPiano, CacheStorage } from "smplr";

const MyPiano = () => {

  const [isLoaded, setIsLoaded] = useState(false)

  // Audio setup
  const context = new AudioContext();
  const storage = new CacheStorage();

  // First time the instrument loads, will fetch the samples from http. Subsequent times from cache.
  const pianoSounds = new SplendidGrandPiano(context, { storage })


  // Load the instrument and set loading status
  const loadInstrument = async () => {
    await pianoSounds.loaded();
    setIsLoaded(true);
  };

  useEffect(() => {
    loadInstrument();
  }, []); // Load the instrument on component mount

  const noteRange = {
    first: MidiNumbers.fromNote('c3'),
    last: MidiNumbers.fromNote('f4'),
  };

  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: noteRange.first,
    lastNote: noteRange.last,
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
  });

  const playNote = (midiNumber) => {
    // Play note using smplr library
    pianoSounds.start({ note: midiNumber });
  };

  const stopNote = (midiNumber) => {
    // Stop note using smplr library
    pianoSounds.stop({ note: midiNumber });
  };

  return (
    <div className="piano-container">
      <Piano
        noteRange={noteRange}
        width={500}
        playNote={playNote}
        stopNote={stopNote}
        keyboardShortcuts={keyboardShortcuts}
        diabled={isLoaded}
      />
      {isLoaded &&
        <p>Loaded</p>}
    </div>
  );
}

export default MyPiano;
