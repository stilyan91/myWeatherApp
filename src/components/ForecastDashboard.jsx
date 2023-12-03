import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import formatDate from '../utils/convertTime';
import { getCurrentConditions } from '../services/getLocation';
import getDayOfWeek from '../utils/getCurrentDay';
import LoadingBar from './LoadingBar';
import { useCurrentLocationContext } from '../context/currentLocationContext';

const ForecastDashboard = () => {
    const navigate = useNavigate();
    const { locationKey } = useParams();
    const [location, setLocation] = useState([]);
    const { selectedLocation } = useCurrentLocationContext();

    let currentDate = '';
    useEffect(() => {
        const fetchCurrentConditions = async () => {
            try {
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
                                        {location.PrecipitationType} - {location.Precip1hr.Metric.Value}  {location.Precip1hr.Metric.Unit}</>

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
                </div>
            </div>
        </div>
    );
};

export default ForecastDashboard;