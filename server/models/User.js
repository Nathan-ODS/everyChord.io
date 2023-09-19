/* eslint-disable semi */
import mongoose from 'mongoose';

const chordSchema = new mongoose.Schema({
  chordLabel: String,
  chordNotes: [String],
  chordMidiNotes: [Number]
});

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  personnalChords: {
    type: [chordSchema],
    default: []
  }
});

const User = mongoose.model('User', userSchema);

export default User;
