import styles from '../styles/heroContainer.module.css';
import styleLocation from '../styles/locationsList.module.css';


import LocationListItem from './LocationListItem';
import getLocation from '../services/getLocation';
import { useState, useEffect, useReducer } from 'react';


const initialState = {
    Version: 1,
    Key: '',
    Type: '',
    Rank: 0,
    LocalizedName: '',
    AdministrativeArea: {
        ID: '',
        LocalizedName: ''
    },
    Country: {
        ID: '',
        LocalizedName: ''
    }
}

const SearchBar = () => {
    const [locationQuery, setLocationQuery] = useState('');
    const [resultLocation, setResultLocation] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(initialState);


    const findLocationHandler = async (e) => {
        e.preventDefault();
        try {
            const result = await getLocation(locationQuery);
            setResultLocation(result);
            setShowSuggestions(true);
            setLocationQuery('')
        } catch (error) {
            console.error(error);
            setShowSuggestions(false);
        };

    };

    useEffect(() => {
        findLocationHandler
        console.log(selectedLocation)
    }, [selectedLocation, locationQuery]);

    const selectLocationHandler = (desiredLocation) => {
        setSelectedLocation(desiredLocation);

    };



    return (
        <div className={`hero ${styles.hero}`}>
            <div className="container">
                <form action="#" className="find-location" onSubmit={findLocationHandler}>
                    <input
                        type="text"
                        placeholder="Find your location..."
                        value={locationQuery}
                        onChange={(e) => setLocationQuery(e.target.value)}
                    />
                    <input type="submit" value="Find" />
                </form>
                <div className={`${showSuggestions ? styleLocation.options : 'hidden'}`}>
                    <ul className={`${styleLocation['options-list']}`} >

                        {showSuggestions && resultLocation.map((location) => (
                            <LocationListItem key={location.key}
                                location={location}
                                onSelectLocation={selectLocationHandler} />
                        ))
                        }
                    </ul>
                </div>
            </div >
        </div >
    );
};

export default SearchBar; 