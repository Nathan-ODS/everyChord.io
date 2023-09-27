import { useEffect, useState } from 'react';
import { Planet } from 'react-planet';
import { FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify'

import { useAudio } from '../../contexts/AudioContext';
import ChordButton from '../ChordButton/ChordButton'
import "./ChordsMenu.css";

// const chords = { root: 'C', type: 'maj', label: 'C' };

const ChordsMenu = ({ activeChord, onChordChange }) => {
  const [activeRoot, setActiveRoot] = useState('C');
  const [activeType, setActiveType] = useState('maj');
  const [roots, setRoots] = useState([]);
  const [types, setTypes] = useState([]);
  const [typesLabels, setTypesLabels] = useState({});
  const { pianoAudio, playActiveChord } = useAudio()

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

  function onPrimaryButtonClick() {
    if (!pianoAudio) {
      toast.error('load piano audio to replay active chord')
      return
    } else {
      playActiveChord()
    }
  }

  const PrimaryButton = activeChord?.label.includes('undefined')
    ? ChordButton({ childElement: <FaSpinner className='spinner' />, className: 'primary-button primary-button--loading' })
    : ChordButton({ label: activeChord?.label, className: 'primary-button', onClick: onPrimaryButtonClick });

  return (
    <div className='chords-menu'>
      <div className='primary-button-container'>
        {PrimaryButton}
      </div>
      <div className='orbits-container'>
        <div className='root-orbit-container'>
          <Planet
            open
            orbitRadius={120}
            rotation={165}
            hideOrbit
            dragableSatellites
            bounceRadius={0.5}
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
            open
            orbitRadius={200}
            rotation={163.5}
            hideOrbit
            dragableSatellites
            bounceRadius={0}
            bounce={false}
            bounceOnOpen={false}
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
    </div>
  )
}

export default ChordsMenu