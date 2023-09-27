import { createContext, useContext, useEffect, useState } from 'react'
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
  // const [isMuted, setIsMuted] = useState(true)

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

  useEffect(() => {
    function playNotes(notes) {
      const debouncedPlayPiano = debounce(() => {
        console.log('oui')
        pianoAudio.stop()

        notes.forEach((note) => {
          pianoAudio.start({ note: note, velocity: 50 });
        })
      }, 200);

      if (pianoAudio && !!notes) {
        debouncedPlayPiano()
      }

      // Cleanup the debounced function on component unmount
      return () => {
        debouncedPlayPiano.cancel();
      };
    }

    function playActiveChord() {
      if (pianoAudio) {
        playNotes(lastActiveNotes)
      }
    }

    playActiveChord()

  }, [lastActiveNotes, pianoAudio])



  return (
    <PianoAudioContext.Provider value={{ pianoAudio, isLoading, lastActiveNotes, setupPianoAudio, setLastActiveNotes, }}>
      {children}
    </PianoAudioContext.Provider>
  )
}