const accuWeatherApiKey = import.meta.env.VITE_REACT_APP_API_KEY;
const language = '&language=en-us'
const validCharactersPattern = /^[A-Za-z\s,.'-]+$/;

const getLocation = async (location) => {
    if (!validCharactersPattern.test(location)) {
        throw new Error("Invalid characters in location");

    }
    const baseUrl = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${accuWeatherApiKey}&q=${location}${language} `;
    console.log(baseUrl)
    try {
        const response = await fetch(baseUrl)
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status} `)
        }
        const result = await response.json()
        return result;
    } catch (err) {
        throw err;
    }
};

export default getLocation;