import { useState } from 'react';


const getCountries = (data) => Object.keys(data);
const getCapitals = (data) => Object.values(data);
const shuffle = (list) => list.sort(() => Math.random() - 0.5);
const addColor = (name) => ({ name, color: 'initial' });

function Card(name, color, onClick) {
    return <button onClick={onClick} style={{backgroundColor: `${color}`}}>{name}</button>
}

function CountryCapitalGame({ data }) {
    const initialItems = shuffle(getCountries(data).concat(getCapitals(data))).map(addColor);
    const [items, setItems] = useState(initialItems);
    const [firstSelected, setFirstSelected] = useState(null);
    const [secondSelected, setSecondSelected] = useState(null);

    const updateItems = (callback) => {
        setItems(prevItems => callback(prevItems));
    };

    const updateColorFirstSelection = (name) => {
        updateItems(items => items.map(item => item.name === name ? { ...item, color: '#0000ff' } : item));
    }

    const updateColorErrorSelection = (name1, name2) => {
        updateItems(items => items.map(item => item.name === name1 || item.name === name2 ? ({ ...item, color: '#ff0000' }) : item));
    }

    const updateColorDefault = (name) => {
        updateItems(items => items.map(item => item.name === name ? ({ ...item, color: 'initial' }) : item));
    }

    const selectionMatches = (name1, name2) => {
        return data[name1] === name2 || data[name2] === name1;
    }

    const removeMatched = () => {
        updateItems(items => items.filter(item => item !== firstSelected && item !== secondSelected));
        setFirstSelected(null);
        setSecondSelected(null);
    }

    const getOnItemClick = (name) => () => {
        if (firstSelected === null) {
            setFirstSelected(name);
            updateColorFirstSelection(name);
        } else if (secondSelected === null) {
            setSecondSelected(name);

            if (selectionMatches(firstSelected, name)) {
                removeMatched();
            } else {
                updateColorErrorSelection(firstSelected, name);
            }
        } else {
            updateColorDefault(firstSelected);
            updateColorDefault(secondSelected);
            setSecondSelected(null);

            setFirstSelected(name);
            updateColorFirstSelection(name);
        }
    }

    return <div>
        <ul>
            {items.map((item, index) => (
                <li key={index}>
                    {Card(item.name, item.color, getOnItemClick(item.name))}
                </li>
            ))}
        </ul>
    </div>;
}

const CountryAndCapital = () => {
    return (
        <>
            <h1>Country and Capital Game</h1>
            <CountryCapitalGame data={{ Germany: "Berlin", Azerbaijan: "Baku", Poland: "Warsaw", "Papua New Guinea": "Port Moresby"}} />
        </>
    );
}

export default CountryAndCapital;