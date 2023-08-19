import React, { useEffect, useState } from 'react';
import "./MyChords.css"

import ChordButton from '../ChordButton/ChordButton'
import ChordTypeBubble from './ChordTypeBubbles/ChordTypeBubbles';
import RootsWheel from './RootsWheel/RootsWheel';

// const chords = { root: 'C', type: 'maj', label: 'C' };

const MyChords = ({ activeChord, onChordChange }) => {

    const [activeRoot, setActiveRoot] = useState('C');
    const [activeType, setActiveType] = useState('');
    const [roots, setRoots] = useState([]);
    const [types, setTypes] = useState([]);
    const [typesLabels, setTypesLabels] = useState({});

    // fetchData
    useEffect(()=> {
        // fetch roots ['C', 'Db', ...]
        async function fetchRoots() {
            const res = await fetch('/api/roots');
            const data = await res.json();

            setRoots(data.roots)
        }
        fetchRoots();

        // fetch chords types { types: [maj, min, ...], typesLabels: ['', 'm', ...]}
        async function fetchTypes() {
            const res = await fetch('/api/types');
            const data = await res.json();

            setTypes(data.types);
            setTypesLabels(data.typesLabelsObject)
        }
        fetchTypes();
    },[])

    return (
        <div className='my-chords'>
            <ChordButton
                label={activeChord?.label}
            />
            <ChordTypeBubble
                types={types}
                typesLabels={typesLabels}
                activeType={activeType}
                activeRoot={activeRoot}
                onChangeType={setActiveType}
            />
            <RootsWheel
                roots={roots}
                activeRoot={activeRoot}
                onChangeRoot={setActiveRoot}
            />
        </div>
    )
}

export default MyChords