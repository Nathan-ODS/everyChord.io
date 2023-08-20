import React, { useEffect, useState } from 'react';
import { Planet } from 'react-planet';
import { FaSpinner } from 'react-icons/fa';
import "./ChordsMenu.css";

import ChordButton from '../ChordButton/ChordButton'

// const chords = { root: 'C', type: 'maj', label: 'C' };

const ChordsMenu = ({ activeChord, onChordChange }) => {
  const [activeRoot, setActiveRoot] = useState('C');
  const [activeType, setActiveType] = useState('maj');
  const [roots, setRoots] = useState([]);
  const [types, setTypes] = useState([]);
  const [typesLabels, setTypesLabels] = useState({});
  const [areRootsDisplayed, setAreRootsDisplayed] = useState(true);

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
      onChordChange({ root: activeRoot, type: activeType, label: chordLabel })
    }
  }, [activeChord, activeRoot, activeType, onChordChange, typesLabels]);

  const PrimaryButton = activeChord?.label.includes('undefined') 
  ? ChordButton({ childElement: <FaSpinner className='spinner' />, className: 'primary-button primary-button--loading'})
  : ChordButton({ label: activeChord?.label, className: 'primary-button', onClick: () => setAreRootsDisplayed(!areRootsDisplayed) });

  return (
    <section className='chords-menu'>
      <div className='primary-button-container'>
        {PrimaryButton}
      </div>
      <div className='orbits-container'>
        <div className={`root-orbit-container ${!areRootsDisplayed ? 'root-orbit-container--hidden' : ''}`}>
          <Planet
            open={areRootsDisplayed}
            orbitRadius={120}
            rotation={165}
            hideOrbit
            dragableSatellites={true}
            bounceRadius={1}
            bounce={false}
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
        </div>
        <div className='type-orbit-container'>
          <Planet
            open={true}
            orbitRadius={areRootsDisplayed ? 210 : 120}
            rotation={160}
            hideOrbit
            dragableSatellites={true}
          >
            {types.map((type) => (
              <ChordButton
                key={type}
                label={activeRoot + typesLabels[type]}
                onClick={() => setActiveType(type)}
                isActive={type === activeType}
                className='type-button'
              />
            ))}
          </Planet>
        </div>
      </div>
    </section>
  )
}

export default ChordsMenu