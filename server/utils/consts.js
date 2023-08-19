export const chromaticScaleMidi = new Map([
  ['C', 60],
  ['Db', 61],
  ['D', 62],
  ['Eb', 63],
  ['E', 64],
  ['F', 65],
  ['Gb', 66],
  ['G', 67],
  ['Ab', 68],
  ['A', 69],
  ['Bb', 70],
  ['B', 71]
])

export const roots = [
  'C',
  'Db',
  'D',
  'Eb',
  'E',
  'F',
  'Gb',
  'G',
  'Ab',
  'A',
  'Bb',
  'B'
]

export const intervalSemiTones = new Map([
  ['tonic', 0],
  ['minor second', 1],
  ['major second', 2],
  ['minor third', 3],
  ['major third', 4],
  ['perfect fourth', 5],
  ['diminished fifth', 6],
  ['perfect fifth', 7],
  ['augmented fifth', 8],
  ['minor sixth', 8],
  ['major sixth', 9],
  ['minor seventh', 10],
  ['major seventh', 11],
  ['octave', 12]
])

export const chordsIntervals = new Map([
  ['maj', ['tonic', 'major third', 'perfect fifth']],
  ['min', ['tonic', 'minor third', 'perfect fifth']],
  ['dim', ['tonic', 'minor third', 'diminished fifth']],
  ['aug', ['tonic', 'major third', 'augmented fifth']],
  ['maj7', ['tonic', 'major third', 'perfect fifth', 'major seventh']],
  ['7', ['tonic', 'major third', 'perfect fifth', 'minor seventh']],
  ['min7', ['tonic', 'minor third', 'perfect fifth', 'minor seventh']],
  ['dim7', ['tonic', 'minor third', 'diminished fifth', 'major sixth']],
  ['min7b5', ['tonic', 'minor third', 'diminished fifth', 'minor seventh']]
])

export const typesLabels = new Map([
  ['maj', ''],
  ['min', 'm'],
  ['dim', 'dim'],
  ['aug', 'aug'],
  ['maj7', 'maj7'],
  ['7', '7'],
  ['min7', 'm7'],
  ['dim7', 'dim7'],
  ['min7b5', 'm7b5']
])

export const types = [
  'maj',
  'min',
  'dim',
  'aug',
  'maj7',
  '7',
  'min7',
  'dim7',
  'min7b5'
]
