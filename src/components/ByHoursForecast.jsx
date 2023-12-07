import { useEffect, useState } from "react";
import { get12HoursForecast } from "../services/fetch12hoursForecast";
import { useLocation } from "react-router-dom";



export default function HoursForecast() {
    const location = useLocation();
    // const favorite = location.state.favorite;
    const [forecastData, setForecastData] = useState([]);
    console.log(location)
    // useEffect(() => {
    //     const result = get12HoursForecast(favorite.Key)
    // }, [])
    return (
        <div className="forecast-table">
            <div className="container">


            </div>
        </div>
    );
};