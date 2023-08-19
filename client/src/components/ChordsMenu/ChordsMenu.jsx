import React, { useEffect, useState } from 'react';
import { Planet } from 'react-planet';
import "./ChordsMenu.css";

import ChordButton from '../ChordButton/ChordButton'
import ChordTypes from './ChordTypeBubbles/ChordType';

// const chords = { root: 'C', type: 'maj', label: 'C' };

const ChordsMenu = ({ activeChord, onChordChange }) => {

  const [activeRoot, setActiveRoot] = useState('C');
  const [activeType, setActiveType] = useState('maj');
  const [roots, setRoots] = useState([]);
  const [types, setTypes] = useState([]);
  const [typesLabels, setTypesLabels] = useState({});

  // fetchTypesAndRoots
  useEffect(() => {
    // fetch roots ['C', 'Db', ...]
    // fetch chords types { types: [maj, min, ...], typesLabels: ['', 'm', ...]}
    async function fetchTypesAndRoots() {
      let res = await fetch('/api/roots');
      let data = await res.json();

      setRoots(data.roots)

      res = await fetch('/api/types');
      data = await res.json();

      setTypes(data.types)
      setTypesLabels(data.typesLabelsObject)
    }

    fetchTypesAndRoots();
  }, [])

  // change activeChord when new root or type
  useEffect(() => {
    const chordLabel = activeRoot + typesLabels[activeType];

    if (chordLabel !== activeChord?.label) {
      onChordChange({ root: activeRoot, type: activeType, label: activeRoot + typesLabels[activeType] })
    }
  }, [activeChord, activeRoot, activeType, onChordChange, typesLabels]);

  const PrimaryButton = ({ label }) => (
    <b className='primary-button'>
      {label}
    </b>
  )


  return (
    <div className='chords-menu'>
      <Planet
        centerContent={<PrimaryButton label={activeChord?.label} />}
        open={true}
        orbitRadius={300}
        bounceOnOpen={false}
        bounceOnClose={false}
        hideOrbit
        dragableSatellites={true}
      >
        {roots.map((root) => (
          <ChordButton
            key={root}
            label={root}
            onClick={() => setActiveRoot(root)}
            isActive={root === activeRoot}
          />
        ))}
      </Planet>

    </div>
  )
}

export default ChordsMenu