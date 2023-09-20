/* eslint-disable semi */
import mongoose from 'mongoose';

const chordSchema = new mongoose.Schema({
  chordLabel: {
    type: String,
    required: true
  },
  chordNotes: {
    type: [String],
    required: true
  },
  chordMidiNotes: {
    type: [Number],
    required: true
  }
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
