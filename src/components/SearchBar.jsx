import { useState, } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import LocationListItem from './LocationListItem';
import { getLocation } from '../services/getLocation';
import styles from '../styles/heroContainer.module.css';
import styleLocation from '../styles/locationsList.module.css';
import { useCurrentLocationContext } from '../context/currentLocationContext';

const SearchBar = () => {
    let favoriteToEdit = {};
    let forEditing = false;
    const loc = useLocation();

    if (loc.state) {
        favoriteToEdit = loc.state.favoriteToEdit
        forEditing = true
    }

    const [locationQuery, setLocationQuery] = useState('');
    const [resultLocation, setResultLocation] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const { selectedLocation, setSelectedLocation } = useCurrentLocationContext();
    const navigate = useNavigate();

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

    const selectLocationHandler = (desiredLocation) => {
        setSelectedLocation(desiredLocation);
        navigate('/' + desiredLocation.Key, { state: { forEditing, favoriteToEdit } }, { replace: true })
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
                            <LocationListItem key={location.Key}
                                location={location}
                                onSelectLocation={selectLocationHandler}
                                favoriteToEdit={favoriteToEdit}
                                forEditing={forEditing} />
                        ))
                        }
                    </ul>
                </div>
            </div >
        </div >
    );
};

export default SearchBar; 