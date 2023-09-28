import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { SplendidGrandPiano, CacheStorage } from 'smplr'
import debounce from 'lodash/debounce'
import { toast } from 'react-toastify'

const PianoAudioContext = createContext()

export function useAudio() {
  return useContext(PianoAudioContext)
}

export function AudioProvider({ children }) {
  const [pianoAudio, setPianoAudio] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [lastActiveNotes, setLastActiveNotes] = useState(null)

  const playNotes = useCallback((notes) => {
    if(!pianoAudio) return
  
    const debouncedPlayPiano = debounce(() => {
      pianoAudio.stop();

      notes.forEach((note) => {
        pianoAudio.start({ note: note, velocity: 50 });
      });
    }, 200);

    if (!!notes) {
      debouncedPlayPiano();
    }

    // Cleanup the debounced function on component unmount
    return () => {
      debouncedPlayPiano.cancel();
    };
  },
    [pianoAudio]
  );

  useEffect(() => {
      playNotes(lastActiveNotes)
  }, [lastActiveNotes, playNotes])

  function playActiveChord() {
    playNotes(lastActiveNotes)
  }

  async function setupPianoAudio() {
    setIsLoading(true)
    try {
      const context = new AudioContext();
      const storage = new CacheStorage();
      const pianoInstance = await new SplendidGrandPiano(context, { storage }).loaded();
      setPianoAudio(pianoInstance);
    } catch (error) {
      console.error('Error setting up piano:', error)
      toast.error('Error while loading the piano audio')
    } finally {
      setIsLoading(false);
      toast.success('Piano Audio successfully loaded 🎹 🎵')
    }
  };

  return (
    <PianoAudioContext.Provider value={{ pianoAudio, isLoading, lastActiveNotes, setupPianoAudio, setLastActiveNotes, playActiveChord }}>
      {children}
    </PianoAudioContext.Provider>
  )
}