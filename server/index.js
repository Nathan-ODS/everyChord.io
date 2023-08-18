import express from 'express'
import midiToNote from 'midi-note'
import { getMidiChord } from './utils/getMidiChord.js'

const PORT = /* process.env.PORT || */ 3001

const app = express()

app.get('/api', (req, res) => {
  res.json({ message: 'Hi from api' })
})

// get chord from root+type (example : root=C type=maj)
app.get('/api/chord/:rootNote/:chordType', (req, res) => {
  const rootNote = req.params.rootNote
  const chordType = req.params.chordType
  const midiChord = getMidiChord(rootNote, chordType)

  const notes = midiChord.map((midi) => midiToNote(midi))

  res.json({
    label: rootNote + chordType,
    midiChord,
    notes
  })
})

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
