import React, { useState } from "react"
import ChordContent from "./components/ChordContent/ChordContent"
import ChordsMenu from './components/ChordsMenu/ChordsMenu'

import { FaHandsHelping, FaHandHoldingHeart } from "react-icons/fa";
import "./App.css";

// Main App
function App() {
  const [activeChord, setActiveChord] = useState(undefined);

  return (
    <div className="App">
      <header className="App-header">
        <h3>EveryChord</h3>
        <span>(Not EVERY chord but you get it 🤓)</span>
      </header>
      <div className="container">
        <section className="chords-menu-container">
          <ChordsMenu
            activeChord={activeChord}
            onChordChange={setActiveChord}
          />
        </section>
        <section className="chord-content-container">
          <ChordContent
            activeChord={activeChord}
          />
          <article className="about-container">
            <p><FaHandHoldingHeart /> Created by Nathan-ODS - <a href="https://github.com/Nathan-ODS/everyChord.io">EveryChord.io</a></p>
            <p><FaHandsHelping /> Find me on <a href="https://github.com/Nathan-ODS">GitHub</a></p>
          </article>
        </section>
      </div>
    </div>
  );
}

export default App;