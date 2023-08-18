import React, {useState} from "react";
import MyPiano from "./components/MyPiano/MyPiano"
import MyChords from './components/MyChords/MyChords'
import "./App.css";

// Main App
function App() {
  const [activeChord, setActiveChord] = useState(undefined);

  const handleChordChange = (chord) => {
    setActiveChord(chord);
  }

  return (
    <div className="App">
        <div className="chords-container">
          <MyChords
            activeChord={activeChord}
            onChordChange={handleChordChange}
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