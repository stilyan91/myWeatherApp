export default function ByHoursForecastItem({
    forecast
}) {
    console.log(forecast)
    return (
        <div className="forecast">
            <div className="forecast-header">
                <div className="day">{day}</div>
            </div>
            <div className="forecast-content" >
                <div className="forecast-icon">
                    <img src={`images/icons/icon-${forecast.Day.Icon}.svg`} alt="" width={48} />
                </div>
                <div className="degree">{forecast.Temperature.Maximum.Value}<sup>o</sup>C</div>
                <small>{forecast.Temperature.Minimum.Value}<sup>o</sup></small>
            </div>
        </div >
    );
};