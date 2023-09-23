import React, { useState } from "react"
import ChordContent from "./components/ChordContent/ChordContent"
import ChordsMenu from './components/ChordsMenu/ChordsMenu'
import UserAuth from './components/UserAuth/UserAuth'
import "./App.css";

// Main App
function App() {
  const [activeChord, setActiveChord] = useState(undefined);

  return (
    <div className="App">
      <div className="user-auth-container">
        <UserAuth />
      </div>
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
        </section>
      </div>
    </div>
  );
}

export default App;