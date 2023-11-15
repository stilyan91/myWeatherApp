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
        setShowSuggestions(true);
        const result = await getLocation();
        setResultLocation(result);
    };

    const selectLocationHandler = (selectedLocation) => {

        console.log(selectedLocation);
    };

    useEffect(() => {
        console.log(resultLocation)
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
                            <li key={location.key} className={styleLocation.li} onClick={() => selectLocationHandler(location)}>
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