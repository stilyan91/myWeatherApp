import { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import formatDate from '../utils/convertTime';
import getDayOfWeek from '../utils/getCurrentDay';
import { getCurrentConditions } from '../services/getLocation';
import { useCurrentLocationContext } from '../context/currentLocationContext';
import { getFiveDayForecast } from "../services/getFiveDaysForecast";
import LoadingBar from './LoadingBar';
import DailyForecast from './DailyForecast';
import AuthContext from '../context/authContext';
import { getFavorites } from '../services/getFavorites';
import { deleteFavorite } from '../services/deleteFavorite';


const ForecastDashboard = () => {
    const navigate = useNavigate();
    const { isAuthenticated, userId } = useContext(AuthContext);
    const [location, setLocation] = useState([]);
    const { selectedLocation } = useCurrentLocationContext();
    const [fiveDayForecast, setFiveDayForecast] = useState([]);
    const [favorites, setFavorites] = useState([]);
    let currentDate = '';
    const loc = useLocation();
    const token = localStorage.getItem('accessToken')
    const forEditing = loc.state?.forEditing
    const favoriteToEdit = loc.state?.favoriteToEdit

    useEffect(() => {
        const result = getFiveDayForecast(selectedLocation.Key)
            .then(data => setFiveDayForecast(data.DailyForecasts))
            .catch(err =>
                console.log(err))
    }, [selectedLocation]);

    useEffect(() => {
        const fetchCurrentConditions = async () => {
            try {
                const data = await getCurrentConditions(selectedLocation.Key);
                setLocation(data[0]);
            } catch (error) {
                console.error('Error fetching data:', error);
                navigate('/')
            }
        };
        fetchCurrentConditions()
        if (isAuthenticated) {
            getFavorites()
                .then(data => {
                    const filteredData = data.filter((fav) => fav._ownerId === userId)
                    setFavorites(filteredData)
                })
                .catch(err => console.log(err))
        };

    }, [selectedLocation.Key]);

    const buttonState = favorites.some((obj) => obj.Key === selectedLocation.Key)

    const deleteOnClickHandler = async () => {
        const getFavoriteForDelete = favorites.find((fav) => fav.Key === selectedLocation.Key);
        await deleteFavorite(getFavoriteForDelete, token);
        navigate('/MyFavorites')

    };
    const editOnClickHandler = async () => {
        try {
            const response = await fetch(`http://localhost:3030/data/favorites/${favoriteToEdit._id}`, {
                method: "PUT",
                headers: {
                    'content-type': 'application/json',
                    'X-Authorization': token,
                },
                body: JSON.stringify(selectedLocation)
            });
            const result = await response.json();
            navigate('/MyFavorites')

        } catch (err) {
            console.error(`Error: ${err.message}`)
        }
    };

    const addOnClickHandler = async () => {
        try {
            const response = await fetch(`http://localhost:3030/data/favorites`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "X-Authorization": token
                },
                body: JSON.stringify(selectedLocation)
            })
            const result = await response.json();
            navigate('/MyFavorites')


        } catch (err) {
            console.log(err);
        }
    };

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

                    {fiveDayForecast.length > 0 && fiveDayForecast.map((forecast, index) => (
                        <DailyForecast key={index} forecast={forecast} />
                    ))}
                </div>
            </div>

            {
                forEditing ? (
                    <Button
                        variant="info"
                        className="bottom-right-button"
                        onClick={editOnClickHandler}>
                        Edit
                    </Button>
                ) : (
                    buttonState ? (
                        <Button
                            variant="info"
                            className="bottom-right-button"
                            onClick={deleteOnClickHandler}
                        > Remove from Favorites
                        </Button>
                    ) : (
                        <Button
                            variant="info"
                            className="bottom-right-button"
                            onClick={addOnClickHandler}
                        >
                            Add to Favorites
                        </Button>
                    )
                )

            }
        </div>)
}

export default ForecastDashboard;