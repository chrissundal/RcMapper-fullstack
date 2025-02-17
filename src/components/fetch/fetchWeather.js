const getWeather = async (lat,long) => {
    try {
        const apiKey = '1989ed13b4b1f1998fe28f764260689e';
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
};

export default getWeather;
