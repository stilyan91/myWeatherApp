const accuWeatherApiKey = import.meta.env.VITE_REACT_APP_API_KEY;

const location = 'New Yo'
const language = '&language=en-us'
const baseUrl = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${accuWeatherApiKey}&q=${location}${language} `;



const getLocation = async () => {
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