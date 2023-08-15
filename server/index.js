const express = require('express')

const PORT = /* process.env.PORT || */ 3001

const app = express()

app.get('/api', (req, res) => {
  res.json({ message: 'Hi from api' })
})

app.get('/api/chord/C', (req, res) => {
  res.json({
    name: 'C',
    midiNotes: [60, 64, 67]
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
