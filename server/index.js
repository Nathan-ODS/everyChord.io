const express = require('express')
const midiToNote = require('midi-note')

const PORT = /* process.env.PORT || */ 3001

const app = express()

app.get('/api', (req, res) => {
  res.json({ message: 'Hi from api' })
})

app.get('/api/chord/C', (req, res) => {
  const midiNotes = [60, 64, 67]
  const notes = midiNotes.map((midi) => midiToNote(midi))

  res.json({
    name: 'C',
    notes,
    midiNotes
  })
})

app.get('/api/chord/', (req, res) => {
  res.json({ midiNotes: [] })
})

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})

/*
var note = require('midi-note')
note(69) // => 'A4'
*/
