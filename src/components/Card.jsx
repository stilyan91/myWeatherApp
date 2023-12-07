import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { getCurrentConditions } from '../services/getLocation';
import { useEffect, useState } from 'react';

import formatDate from '../utils/convertTime';
import getDayOfWeek from '../utils/getCurrentDay';

export default function FavCard({
    favorite
}) {
    let currentDate = '';
    const [forecast, setForecast] = useState({});
    useEffect(() => {
        getCurrentConditions(favorite.Key)
            .then(data => {
                setForecast(data[0])
            })
            .catch(err => { throw new Error(`Failed fetch ${err}`) })

    }, []);

    if (forecast && forecast.LocalObservationDateTime) {
        currentDate = formatDate(forecast.LocalObservationDateTime)
    };

    console.log(favorite.Key, forecast)
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
                <Link
                    style={{ background: "#009ad8" }}
                    to={{
                        pathname: `/MyFavorites/${encodeURIComponent(favorite.LocalizedName)}`,
                        state: { favorite: favorite }
                    }}
                >Get More Info
                </Link>
            </Card.Body>
        </Card >
    )
};