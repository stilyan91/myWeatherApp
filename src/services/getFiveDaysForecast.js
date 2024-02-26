const accuWeatherApiKey = import.meta.env.VITE_REACT_APP_API_KEY;
const language = '&language=en-us';

export const getFiveDayForecast = async (locationKey) => {
    const baseUrl = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${accuWeatherApiKey}&language=en-us&details=true&metric=true`
    try {
        const response = await fetch(baseUrl)

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status} `)
        }
        const result = await response.json()
        return result;
    }
    catch (err) {
        console.log(err);
    }
};


