import express from 'express'
import bodyParser from 'body-parser'
import midiToNote from 'midi-note'

import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

import { types, typesLabels, roots } from './utils/consts.js'
import { getMidiChord } from './utils/getMidiChord.js'

const __dirname = dirname(fileURLToPath(import.meta.url));

const PORT = /* process.env.PORT || */ 3001
const app = express()

app.use(bodyParser.json())

// initial load
app.get('/api/types', (req, res) => {
  // needed because can't send Map() in JSON
  const typesLabelsObject = {}

  for (const [key, value] of typesLabels) {
    typesLabelsObject[key] = value
  }

  res.json({
    types,
    typesLabelsObject
  })
})

app.get('/api/roots', (req, res) => {
  res.json({ roots })
})

// get chord from root+type (example : root=C type=maj)
app.get('/api/chords/:rootNote/:chordType', (req, res) => {
  const rootNote = req.params.rootNote
  const chordType = req.params.chordType
  const midiChord = getMidiChord(rootNote, chordType)

  const notes = midiChord.map((midi) => midiToNote(midi))
  res.json({
    label: rootNote + typesLabels.get(chordType),
    midiChord,
    notes
  })
})


if (process.env.NODE_ENV === 'production') {
  console.log('Production mode')
  app.use(express.static(path.resolve(__dirname, '../client/build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
  });
} else {
  console.log('Development mode')
}

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
