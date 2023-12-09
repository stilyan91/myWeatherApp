import { useEffect, useState } from "react";
import { get12HoursForecast } from "../services/fetch12hoursForecast";
import { useLocation } from "react-router-dom";
import ByHoursForecastItem from "./ByHoursForecastItem";


export default function HoursForecast() {
    const location = useLocation();
    // const favorite = location.state.favorite;
    //TODO
    const favorite = {
        AdministrativeArea
            :
            { ID: 'NY', LocalizedName: 'New York' },
        Country
            :
            { ID: 'US', LocalizedName: 'United States' },
        Key
            :
            "349727",
        LocalizedName
            :
            "New York",
        Rank
            :
            15,
        Type
            :
            "City",
        Version
            :
            1,
        _createdOn
            :
            1701989190110,
        _id
            :
            "7665a18c-fe6f-4e26-89b0-968a48ca34d8",
        _ownerId
            :
            "35c62d76-8152-4626-8712-eeb96381bea8",
    }
    const [forecastData, setForecastData] = useState([]);
    useEffect(() => {
        get12HoursForecast(favorite.Key)
            .then(result => setForecastData(result))
            .catch(err => console.error(err))
    }, [])
    return (
        <div className="forecast-table">
            <div className="container">
                {forecastData && forecastData.map((data) => (< ByHoursForecastItem key={data.DateTime} forecast={data} />))}
            </div>
        </div>
    );
};