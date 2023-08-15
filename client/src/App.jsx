import React from "react";
import MyPiano from "./components/MyPiano/MyPiano"
import MyChords from './components/MyChords/MyChords'
import "./App.css";

// Main App
function App() {

  return (
    <div className="App">
        <div className="chords-container">
          <MyChords />
        </div>
        <div className="piano-container">
          <MyPiano />
        </div>
    </div>
  );
}

export default App;