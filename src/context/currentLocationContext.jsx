import { createContext, useState, useContext, useEffect } from "react";

const LocationContext = createContext();
export const useCurrentLocationContext = () => useContext(LocationContext);
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
};

export const LocationProvider = ({
    children,
}) => {
    const [selectedLocation, setSelectedLocation] = useState(() => {
        const localData = localStorage.getItem('selectedLoc')
        return localData ? JSON.parse(localData) : initialState;
    });

    useEffect(() => {
        localStorage.setItem('selectedLoc', JSON.stringify(selectedLocation))
    }, [selectedLocation])
    return (
        <LocationContext.Provider value={{ selectedLocation, setSelectedLocation }} >
            {children}
        </LocationContext.Provider>
    );
};

export default LocationContext;