import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import formatDate from '../utils/convertTime';


const ForecastDashboard = () => {
    const { locationKey } = useParams();

    useEffect(() => {
        console.log(locationKey)

    }, [locationKey]);

    return (
        <div className="forecast-table">
            <div className="container">
                <div className="forecast-container">
                    <div className="today forecast">
                        <div className="forecast-header">
                            <div className="day">Monday</div>
                            <div className="date">6 Oct</div>
                        </div>
                        <div className="forecast-content">
                            <div className="location"></div>
                            <div className="degree">
                                <div className="num">23<sup>o</sup>C</div>
                                <div className="forecast-icon">
                                    <img src="images/icons/icon-1.svg" alt="" width={90} />
                                </div>
                            </div>
                            <span><img src="images/icon-umberella.png" alt="" />20%</span>
                            <span><img src="images/icon-wind.png" alt="" />18km/h</span>
                            <span><img src="images/icon-compass.png" alt="" />East</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForecastDashboard;