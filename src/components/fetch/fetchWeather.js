const getWeather = async (lat,long) => {
    try {
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
};

export default getWeather;
