import React, {useState} from "react";
import MyPiano from "./components/MyPiano/MyPiano"
import ChordsMenu from './components/ChordsMenu/ChordsMenu'
import "./App.css";

// Main App
function App() {
  const [activeChord, setActiveChord] = useState(undefined);

  return (
    <div className="App">
        <div className="chords-menu-container">
          <ChordsMenu
            activeChord={activeChord}
            onChordChange={setActiveChord}
          />
        </div>
        <div className="piano-container">
          <MyPiano
            activeChord={activeChord}
          />
        </div>
    </div>
  );
}

export default App;