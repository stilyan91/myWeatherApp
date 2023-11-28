import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import formatDate from '../utils/convertTime';
import { getCurrentConditions } from '../services/getLocation';
import LoadingBar from './LoadingBar';


const ForecastDashboard = () => {
    const navigate = useNavigate();
    const { locationKey } = useParams();
    const [location, setLocation] = useState([]);
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
    console.log(location)
    return (
        <div className="forecast-table">
            <div className="container">
                <div className="forecast-container">
                    <div className="today forecast">
                        <div className="forecast-header">
                            <div className="day">Monday</div>
                            <div className="date">{currentDate}</div>
                        </div>
                        <div className="forecast-content">
                            <div className="location">name</div>
                            <div className="degree">
                                <div className="num">{location.RealFeelTemperature.Metric.Value}<sup>o</sup>C</div>
                                <div className="forecast-icon">
                                    <img src="images/icons/icon-1.svg" alt="" width={90} />
                                </div>
                            </div>
                            <span><img src="images/icon-umberella.png" alt="" />20%</span>
                            <span><img src="images/icon-wind.png" alt="" />2s</span>
                            <span><img src="images/icon-compass.png" alt="" />East</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForecastDashboard;