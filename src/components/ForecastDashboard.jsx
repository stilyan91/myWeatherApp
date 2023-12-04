import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import formatDate from '../utils/convertTime';
import getDayOfWeek from '../utils/getCurrentDay';
import { getCurrentConditions } from '../services/getLocation';
import { useCurrentLocationContext } from '../context/currentLocationContext';
import { getFiveDayForecast } from "../services/getFiveDaysForecast";
import LoadingBar from './LoadingBar';
import DailyForecast from './DailyForecast';

const ForecastDashboard = () => {
    const navigate = useNavigate();
    const { locationKey } = useParams();
    const [location, setLocation] = useState([]);
    const { selectedLocation } = useCurrentLocationContext();
    const [fiveDayForecast, setFiveDayForecast] = useState([]);
    let currentDate = '';



    useEffect(() => {
        const result = getFiveDayForecast(selectedLocation.Key)
            .then(data => setFiveDayForecast(data.DailyForecasts))
            .catch(err =>
                console.log(err))
    }, [selectedLocation]);



    useEffect(() => {
        const fetchCurrentConditions = async () => {
            try {
                console.log(locationKey)
                const data = await getCurrentConditions(locationKey);
                setLocation(data[0]);
            } catch (error) {
                console.error('Error fetching data:', error);
                navigate('/')
            }
        };
        fetchCurrentConditions()
    }, [locationKey]);


    if (location && location.LocalObservationDateTime) {
        currentDate = formatDate(location.LocalObservationDateTime)
    }


    if (location.length === 0) {
        console.log('Loading...');
        return <LoadingBar />
    }

    return (
        <div className="forecast-table">
            <div className="container">
                <div className="forecast-container">
                    <div className="today forecast">
                        <div className="forecast-header">
                            <div className="day">{getDayOfWeek(currentDate)}</div>
                            <div className="date">{currentDate}</div>
                        </div>
                        <div className="forecast-content">
                            <div className="location">{selectedLocation.LocalizedName} {selectedLocation.Country.LocalizedName}</div>
                            <div className="degree">
                                <div className="num">{location.Temperature.Metric.Value}<sup>o</sup>C {location.WeatherText}</div>
                                <div className="forecast-icon">
                                    <img src={`images/icons/icon-${location.WeatherIcon}.svg`} alt="" width={90} />
                                </div>
                            </div>
                            <span>
                                <img
                                    src="images/icon-umberella.png"
                                    alt=""
                                />
                                {location.HasPrecipitation ? (
                                    <>
                                        {location.PrecipitationType} - {location.PrecipitationSummary.Precipitation.Metric.Value}  {location.Precip1hr.Metric.Unit}</>

                                ) : ("0 %")}
                            </span>
                            <span><img src="images/icon-wind.png" alt="" />{location.Wind.Speed.Metric.Value} {location.Wind.Speed.Metric.Unit}</span>
                            <span>
                                {location.Wind.Direction ? (
                                    <>
                                        <img src="images/icon-compass.png"
                                            alt=""
                                            style={{ transform: `rotate(${location.Wind.Direction.Degrees}deg)` }}
                                        />
                                        {location.Wind.Direction.Degrees} {location.Wind.Direction.Localized}
                                    </>
                                ) : "There is no wind"}
                            </span>
                        </div>
                    </div>

                    {fiveDayForecast.length > 0 && fiveDayForecast.map(forecast => (
                        <DailyForecast key={forecast} forecast={forecast} />
                    ))}

                </div>
            </div>
        </div>






    );
};

export default ForecastDashboard;