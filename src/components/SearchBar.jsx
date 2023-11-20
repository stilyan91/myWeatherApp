import styles from '../styles/heroContainer.module.css';
import getLocation from '../services/getLocation';
import styleLocation from '../styles/locationsList.module.css';
import { useState, useEffect } from 'react';


const SearchBar = () => {
    const [locationQuery, setLocationQuery] = useState('');
    const [resultLocation, setResultLocation] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);


    const findLocationHandler = async (e) => {
        e.preventDefault();
        try {
            const result = await getLocation(locationQuery);
            setResultLocation(result);
            setShowSuggestions(true);
        } catch (error) {
            console.error(error);
            setShowSuggestions(false);
        };

    };

    const selectLocationHandler = (selectedLocation) => {


    };

    useEffect(() => {
        console.log(locationQuery)
    }, [resultLocation]);

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
                        {resultLocation.map((location) => (
                            <li key={location.key} className={styleLocation.li} onClick={() => selectLocationHandler}>
                                <div className={`table-row ${styleLocation['table-row']} `} >
                                    <div className={`table-cell ${styleLocation['table-cell']}`}>Type: {location.Type}</div>
                                    <div className={`table-cell ${styleLocation['table-cell']}`}>Name: {location.LocalizedName}</div>
                                    <div className={`table-cell ${styleLocation['table-cell']}`}>Country: {location.Country.LocalizedName}</div>
                                    <div className={`table-cell ${styleLocation['table-cell']}`}>Administrative Area: {location.AdministrativeArea.LocalizedName}</div>
                                </div>
                            </li>
                        ))
                        }
                    </ul>
                </div>
            </div >
        </div >
    );
};

export default SearchBar; 