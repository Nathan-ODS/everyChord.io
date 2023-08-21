import React, {useState} from "react";
import MyPiano from "./components/MyPiano/MyPiano"
import ChordsMenu from './components/ChordsMenu/ChordsMenu'
import "./App.css";

// Main App
function App() {
  const [activeChord, setActiveChord] = useState(undefined);

  return (
    <div className="App">
        <section className="chords-menu-container">
          <ChordsMenu
            activeChord={activeChord}
            onChordChange={setActiveChord}
          />
        </section>
        <section className="piano-container">
          <MyPiano
            activeChord={activeChord}
          />
        </section>
    </div>
  );
}

export default App;