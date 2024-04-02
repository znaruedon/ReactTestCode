import React, { useState, useEffect } from 'react';

const items = [
    { type: 'Fruit', name: 'Apple' },
    { type: 'Vegetable', name: 'Broccoli' },
    { type: 'Vegetable', name: 'Mushroom' },
    { type: 'Fruit', name: 'Banana' },
    { type: 'Vegetable', name: 'Tomato' },
    { type: 'Fruit', name: 'Orange' },
    { type: 'Fruit', name: 'Mango' },
    { type: 'Fruit', name: 'Pineapple' },
    { type: 'Vegetable', name: 'Cucumber' },
    { type: 'Fruit', name: 'Watermelon' },
    { type: 'Vegetable', name: 'Carrot' },
];

const App = () => {
    const [fruits, setFruits] = useState([]);
    const [vegetables, setVegetables] = useState([]);
    const [allItems, setAllItems] = useState(items);

    useEffect(() => {
        const timeout = setTimeout(() => {
            fruits.forEach(item => {
                setFruits(prevFruits => prevFruits.filter(i => i !== item));
                setAllItems(prevItems => [...prevItems, item]);
            });
            vegetables.forEach(item => {
                setVegetables(prevVegetables => prevVegetables.filter(i => i !== item));
                setAllItems(prevItems => [...prevItems, item]);
            });
        }, 5000);

        return () => clearTimeout(timeout);
    }, [fruits, vegetables]);

    const handleItemClick = (item, listType) => {
        if (listType === 'Fruit') {
            setFruits(prevState => [...prevState, item]);
            setAllItems(prevState => prevState.filter(i => i !== item));
        } else {
            setVegetables(prevState => [...prevState, item]);
            setAllItems(prevState => prevState.filter(i => i !== item));
        }
    };

    const handleRemoveItemClick = (item, listType) => {
        if (listType === 'Fruit') {
            setFruits(prevState => prevState.filter(i => i !== item));
            setTimeout(() => {
                setAllItems(prevState => [...prevState, item]);
            }, 5000);
        } else {
            setVegetables(prevState => prevState.filter(i => i !== item));
            setTimeout(() => {
                setAllItems(prevState => [...prevState, item]);
            }, 5000);
        }
    };

    return (
        <div className="container">
            <div className="column">
                <h2>All Items</h2>
                {allItems.map((item, index) => (
                    <button key={index} onClick={() => handleItemClick(item, item.type)}>
                        {item.name}
                    </button>
                ))}
            </div>
            <div className="column">
                <h2>Fruits</h2>
                {fruits.length === 0 && <p>No fruits selected</p>}
                {fruits.map((item, index) => (
                    <button key={index} onClick={() => handleRemoveItemClick(item, item.type)}>
                        {item.name}
                    </button>
                ))}
            </div>
            <div className="column">
                <h2>Vegetables</h2>
                {vegetables.length === 0 && <p>No vegetables selected</p>}
                {vegetables.map((item, index) => (
                    <button key={index} onClick={() => handleRemoveItemClick(item, item.type)}>
                        {item.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default App;
