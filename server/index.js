import express from 'express'
import midiToNote from 'midi-note'

import { types, typesLabels, roots } from './utils/consts.js'
import { getMidiChord } from './utils/getMidiChord.js'

import User from './models/User.js'

import connectDB from './db.js'

const PORT = /* process.env.PORT || */ 3001
const app = express()

// connection to the MongoDB
await connectDB()

app.get('/api', (req, res) => {
  res.json({ message: 'Hi from api' })
})

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
app.get('/api/chord/:rootNote/:chordType', (req, res) => {
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

// User
// Creating a new resource
// app.post('/resources', createResource);

// Getting a User by ID
app.get('/api/user/:id', async (req, res) => {
  const userId = req.params.id

  try {
    const user = await User.findById(userId, 'userName personnalChords')

    if (!user) {
      res.status(404).json({ error: 'user not found' })
      return
    }

    res.json(user)
  } catch (error) {
    // Handle any errors that occur during the database query
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Updating a specific resource by ID
// router.put('/resources/:id', updateResource);

// Deleting a specific resource by ID
// router.delete('/resources/:id', deleteResource);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
