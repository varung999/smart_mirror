export async function fetchWeather() {
    const response = await fetch("http://localhost:3000/api/weather")
    const weather = await response.json() as OpenWeatherResponse
    if (!response.ok) throw new Error(`Error fetching weather`);
    return weather;
}