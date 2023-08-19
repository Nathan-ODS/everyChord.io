import React, { useEffect, useState, useRef } from 'react';
import { Planet } from 'react-planet';
import "./ChordsMenu.css";

import ChordButton from '../ChordButton/ChordButton'

// const chords = { root: 'C', type: 'maj', label: 'C' };

const ChordsMenu = ({ activeChord, onChordChange }) => {
  const primaryButtonRef = useRef(null)

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

  primaryButtonRef.current = PrimaryButton({label: activeChord?.label});

  return (
    <div className='chords-menu'>
      <Planet
        centerContent={primaryButtonRef.current}
        open={true}
        orbitRadius={150}
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
            className='root-button'
          />
        ))}
      </Planet>

      <Planet
        centerContent={primaryButtonRef.current}
        open={true}
        orbitRadius={250}
        bounceOnOpen={false}
        bounceOnClose={false}
        hideOrbit
        dragableSatellites={true}
      >
        {types.map((type) => (
          <ChordButton
            key={type}
            label={activeRoot+typesLabels[type]}
            onClick={() => setActiveType(type)}
            isActive={type === activeType}
          />
        ))}
      </Planet>
    </div>
  )
}

export default ChordsMenu