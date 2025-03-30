import { useState } from 'react';


const getCountries = (data) => Object.keys(data);
const getCapitals = (data) => Object.values(data);
const shuffle = (list) => list.sort(() => Math.random() - 0.5);
const initializeItem = (name) => ({ name, selected: false, color: 'initial' });

function Button(name, color, onClick) {
    return <button onClick={onClick} style={{backgroundColor: `${color}`}}>{name}</button>
}

function CountryCapitalGame({ data }) {
    const initialItems = shuffle(getCountries(data).concat(getCapitals(data))).map(initializeItem);
    const [items, setItems] = useState(initialItems);

    const resetNonMatchedItems = (items) => {
        if (items.filter(item => item.selected === true).length === 2) {
            return items.map(item => item.selected ? ({ ...item, selected: false, color: 'initial' }) : item);
        }

        return items;
    }

    const markAsFirstOption = (items) => items.map(item => {
        if (item.selected === true) {
            return ({ ...item, color: '#0000ff' });
        }

        return item;
    });

    const verifyMatch = (items) => {
        const [firstItemSelected, secondItemSelected] = items.filter(item => item.selected === true);

        return data[firstItemSelected.name] === secondItemSelected.name || data[secondItemSelected.name] === firstItemSelected.name;
    }

    const deleteSelectedItems = (items) => items.filter(item => item.selected === false);

    const addSelection = (items, name) => items.map(item => item.name === name ? ({
        ...item,
        selected: true,
    }) : item);

    const twoItemsSelected = items => items.filter(item => item.selected === true).length === 2;

    const markAsError = items => items.map(item => {
        if (item.selected === true) {
            return { ...item, color: '#ff0000' };
        }

        return item;
    });

    const getOnItemClick = (name) => () => {
        const resetItems = resetNonMatchedItems(items);
        const itemsWithNewSelection = addSelection(resetItems, name);

        if(twoItemsSelected(itemsWithNewSelection)) {
            if (verifyMatch(itemsWithNewSelection)) {
                setItems(deleteSelectedItems(itemsWithNewSelection));
            } else {
                setItems(markAsError(itemsWithNewSelection));
            }
        } else {
            setItems(markAsFirstOption(itemsWithNewSelection));
        }
    }

    return (
        <div>
            {items.map((item, index) => (
                <span key={index}>
                    {Button(item.name, item.color, getOnItemClick(item.name))}
                </span>
            ))}
        </div>
    );
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