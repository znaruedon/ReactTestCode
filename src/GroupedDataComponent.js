import React, { useState, useEffect } from 'react';

const GroupedDataComponent = () => {
    const [groupedData, setGroupedData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://dummyjson.com/users');
                const data = await response.json();
                const grouped = groupData(data.users);
                setGroupedData(grouped);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const groupData = (users) => {
        const grouped = {};

        users.forEach(user => {
            const { company, gender, age, hair, address, firstName, lastName } = user;
            const department = company.department;

            if (!grouped[department]) {
                grouped[department] = {
                    male: 0,
                    female: 0,
                    ageRange: '',
                    hair: {},
                    addressUser: {}
                };
            }

            // Count gender
            if (gender === 'male') {
                grouped[department].male++;
            } else {
                grouped[department].female++;
            }

            // Calculate age range (you may need to implement this logic)
            const ageRange = calculateAgeRange(age);
            grouped[department].ageRange = ageRange;

            // Count hair color
            const hairColor = hair.color;
            if (!grouped[department].hair[hairColor]) {
                grouped[department].hair[hairColor] = 1;
            } else {
                grouped[department].hair[hairColor]++;
            }

            // Store address
            const fullName = firstName + lastName;
            grouped[department].addressUser[fullName] = address.postalCode;
        });

        return grouped;
    };

    const calculateAgeRange = (age) => {
        // Logic to calculate age range
        // Example:
        if (age < 30) {
            return 'Under 30';
        } else if (age >= 30 && age < 50) {
            return '30-49';
        } else {
            return '50 and above';
        }
    };

    // Render grouped data
    return (
        <div>
            {Object.keys(groupedData).map(department => (
                <div key={department}>
                    <h2>{department}</h2>
                    <p>Male: {groupedData[department].male}</p>
                    <p>Female: {groupedData[department].female}</p>
                    <p>Age Range: {groupedData[department].ageRange}</p>
                    <p>Hair Color Summary:</p>
                    <ul>
                        {Object.keys(groupedData[department].hair).map(color => (
                            <li key={color}>{color}: {groupedData[department].hair[color]}</li>
                        ))}
                    </ul>
                    <p>Address Users:</p>
                    <ul>
                        {Object.keys(groupedData[department].addressUser).map(name => (
                            <li key={name}>{name}: {groupedData[department].addressUser[name]}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default GroupedDataComponent;
