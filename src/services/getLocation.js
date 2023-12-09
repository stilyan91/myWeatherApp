const accuWeatherApiKey = import.meta.env.VITE_REACT_APP_API_KEY;
const language = '&language=en-us'
const validCharactersPattern = /^[A-Za-z\s,.'-]+$/;

export const getLocation = async (location) => {
    if (!validCharactersPattern.test(location) || location === '') {
        throw new Error("Invalid characters in location");

    }
    const baseUrl = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${accuWeatherApiKey}&q=${location}${language} `;
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


export const getCurrentConditions = async (locationKey) => {
    const baseUrl = `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${accuWeatherApiKey}&language=en-us&details=true`
    try {
        const response = await fetch(baseUrl)

        if (response.status === 400) {
            throw new Error(`Bad location key ${locationKey}`)
        }
        const result = await response.json();
        return result;
    } catch (err) {
        throw err;
    };
};


