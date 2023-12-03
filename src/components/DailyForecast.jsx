import formatDate from '../utils/convertTime';
import getDayOfWeek from '../utils/getCurrentDay';


export default function DailyForecast({
    forecast
}) {
    const currentDate = formatDate(forecast.Date)
    const day = getDayOfWeek(currentDate)
    const onClickHandler = (forecast) => {
        window.location.href = forecast.MobileLink;
    }
    console.log(forecast.MobileLink)

    return (
        <div className="forecast" onClick={onClickHandler} style={{ cursor: 'pointer' }}>
            <div className="forecast-header">
                <div className="day">{day}</div>
            </div>
            <div className="forecast-content">
                <div className="forecast-icon">
                    <img src={`images/icons/icon-${forecast.Day.Icon}.svg`} alt="" width={48} />
                </div>
                <div className="degree">{forecast.Temperature.Maximum.Value}<sup>o</sup>C</div>
                <small>{forecast.Temperature.Minimum.Value}<sup>o</sup></small>
            </div>
        </div>
    );
};