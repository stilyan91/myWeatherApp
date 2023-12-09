const accuWeatherApiKey = import.meta.env.VITE_REACT_APP_API_KEY;


export const get12HoursForecast = async (locationKey) => {
    try {
        const response = await fetch(`http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${locationKey}?apikey=${accuWeatherApiKey}&language=en-us&details=true&metric=true`)
        const result = await response.json();
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status} `)
        }
        return result;

    } catch (err) {
        console.error(err);
    };
};

