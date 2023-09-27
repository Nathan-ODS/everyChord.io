import React, { useState } from "react"
import ChordContent from "./components/ChordContent/ChordContent"
import ChordsMenu from './components/ChordsMenu/ChordsMenu'
import UserAuth from './components/UserAuth/UserAuth'
import "./App.css";
import { useAuth } from "./contexts/AuthContext";

// Main App
function App() {
  const [activeChord, setActiveChord] = useState(undefined);
  const [isPlayingChord, setIsPlayingChord] = useState(false);
  const { user } = useAuth()

  return (
    <div className="App">
      <div className="user-auth-container">
        <div>
          {
            user ? <span className='user-auth-container__welcome-message'>Welcome {user.userName}</span> : <></>
          }
        </div>

        <UserAuth />
      </div>
      <div className="container">
        <section className="chords-menu-container">
          <ChordsMenu
            activeChord={activeChord}
            onChordChange={setActiveChord}
            onPrimaryButtonClick={setIsPlayingChord}
          />
        </section>
        <section className="chord-content-container">
          <ChordContent
            activeChord={activeChord}
            isPlayingChord={isPlayingChord}
          />
        </section>
      </div>
    </div>
  );
}

export default App;