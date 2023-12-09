import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentConditions } from '../services/getLocation';
import { useEffect, useState, useContext } from 'react';
import { deleteFavorite } from '../services/deleteFavorite';

import formatDate from '../utils/convertTime';
import getDayOfWeek from '../utils/getCurrentDay';
import AuthContext from '../context/authContext';

export default function FavCard({
    favorite,
}) {

    const { isAuthenticated } = useContext(AuthContext);
    const token = localStorage.getItem('accessToken');
    const navigate = useNavigate();
    let currentDate = '';
    const [forecast, setForecast] = useState({});

    useEffect(() => {
        getCurrentConditions(favorite.Key)
            .then(data => {
                setForecast(data[0])
            })
            .catch(err => { throw new Error(`Failed fetch ${err}`) })

    }, []);

    const deleteHandler = async () => {
        navigate(`/MyFavorites/${favorite.LocalizedName}/delete`)
        await deleteFavorite(favorite, token);
        navigate('/MyFavorites');

    };

    const editHandler = async (favorite) => {
        navigate('/', { state: { favoriteToEdit: favorite } })
    };
    const onClickHandler = () => {
        window.open(forecast.MobileLink, '_blank');
    };
    if (forecast && forecast.LocalObservationDateTime) {
        currentDate = formatDate(forecast.LocalObservationDateTime)
    };

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{favorite.LocalizedName} - {favorite.Country.LocalizedName}</Card.Title>
                <Card.Text>{getDayOfWeek(currentDate)} {currentDate}</Card.Text>
                <Card.Text>
                    {forecast.Temperature && forecast.Temperature.Metric &&
                        <>
                            {forecast.Temperature.Metric.Value}<sup>o</sup>C {forecast.WeatherText}
                        </>
                    }
                    {forecast.WeatherIcon && <img src={`images/icons/icon-${forecast.WeatherIcon}.svg`} alt="" width={90} />}
                </Card.Text>
                <Button variant="primary" onClick={() => onClickHandler(forecast)}>
                    Click for More Info
                </Button>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-around', marginTop: '10px' }}>
                    <Button variant="primary" onClick={() => editHandler(favorite)}>Edit</Button>
                    <Button variant="primary" onClick={() => deleteHandler(favorite)}>Delete</Button>
                </div>
            </Card.Body>
        </Card >
    )
};