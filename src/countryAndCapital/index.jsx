import { useState } from 'react';


const getCountries = (data) => Object.keys(data);
const getCapitals = (data) => Object.values(data);
const shuffle = (list) => list.sort(() => Math.random() - 0.5);

function Card(name, onClick) {
    return <button>{name}</button>
}

function CountryCapitalGame({ data }) {
    const items = shuffle(getCountries(data).concat(getCapitals(data)));
    const [firstSelected, setFirstSelected] = useState([]);
    const [secondSelected, setSecondSelected] = useState([]);

    // I have no more time left but my idea was using the firstSelected and secondSelected to check if the user selected the correct answer
    // and update the state color of the cards and the state of the game with another useState

    return <div>
        <ul>
            {items.map((item, index) => (
                <li key={index}>
                    {Card(item)}
                </li>
            ))}
        </ul>
    </div>;
}

const CountryAndCapital = () => {
    return (
        <>
            <h1>Country and Capital Game</h1>
        </>
    );
}

export default CountryAndCapital;