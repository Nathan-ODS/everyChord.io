import { chromaticScaleMidi, chordsIntervals, intervalSemiTones } from './consts.js'

export function getMidiChord (rootNote, chordType) {
  const rootMidiNote = chromaticScaleMidi.get(rootNote)
  const intervals = chordsIntervals.get(chordType)

  const midiChord = intervals.map((interval) => rootMidiNote + intervalSemiTones.get(interval))

  return midiChord
}
