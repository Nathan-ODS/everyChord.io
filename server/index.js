import express from 'express'
import bodyParser from 'body-parser'
import midiToNote from 'midi-note'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { types, typesLabels, roots } from './utils/consts.js'
import { getMidiChord } from './utils/getMidiChord.js'

import User from './models/User.js'

import connectDB from './db.js'

const PORT = /* process.env.PORT || */ 3001
const app = express()
const secretKey = 'commeundejavu2023'

app.use(bodyParser.json())

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

// Getting a User by ID
app.get('/api/user/:id', async (req, res) => {
  const userId = req.params.id

  try {
    const user = await User.findById(userId, 'userName personnalChords')

    if (!user) {
      res.status(404).json({ error: 'user not found' })
    }

    res.json(user)
  } catch (error) {
    // Handle any errors that occur during the database query
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Updating User.personnalChords by ID
app.put('/api/user/:id', async (req, res) => {
  const userId = req.params.id
  const { newPersonnalChord } = req.body

  try {
    const user = await User.findById(userId, 'personnalChords')

    if (!user) {
      res.status(404).json({ error: 'user not found' })
      return
    }

    user.personnalChords.push(newPersonnalChord)

    const updatedUser = await user.save()

    res.json(updatedUser)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.get('/api/tokenValidation', async (req, res) => {
  const token = req.headers.authorization

  if (!token) {
    return res.status(401).json({ message: 'Token not provided' })
  }

  try {
    const decodedToken = jwt.verify(token, secretKey)

    const user = await User.findOne({ _id: decodedToken._id }, 'userName personnalChords')
    res.json(user)
  } catch (error) {
    return res.status(403).json({ message: 'Token is invalid' })
  }
})

app.post('/api/login', async (req, res) => {
  const { userName, password } = req.body

  try {
    const userDb = await User.findOne({ userName }, 'userName password personnalChords')

    if (!userDb) {
      return res.status(400).json({ message: 'Invalid UserName or Password' })
    }

    const doesPasswordMatch = await bcrypt.compare(password, userDb.password)

    if (!doesPasswordMatch) {
      return res.status(401).json({ message: 'Invalid UserName or Password' })
    }

    const token = jwt.sign({ _id: userDb.id }, secretKey, {
      expiresIn: '1h' // Token expiration time (adjust as needed)
    })

    const user = {
      _id: userDb.id,
      userName: userDb.userName,
      personnalChords: userDb.personnalChords
    }

    res.json({ token, user })
  } catch (error) {
    console.error('Error while loging', error)
  }
})

app.post('/api/register', async (req, res) => {
  const { userName, password } = req.body
  try {
    const isUserNameTaken = await User.exists({ userName })

    if (isUserNameTaken) {
      return res.status(400).json({ message: 'UserName is alreay taken' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await User.create({
      userName,
      password: hashedPassword
    })

    res.json({ message: 'User registered successfully' })
  } catch (error) {
    console.error('Error while registering new user', error)
  }
})

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
