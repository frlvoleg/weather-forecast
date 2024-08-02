import { useEffect, useState } from "react";

export default function WeatherData() {
    const [data, setData] = useState(null);
    const [error, setError] = useState('');
    const [city, setCity] = useState('');

    const API_KEY = 'af75452408ee4c5895e11d2b1eef7026';

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_KEY}&units=imperial`;
            getData(url);
        });
    }, []);

    async function getData(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("City not found");
            }
            const data = await response.json();
         
            setData(data);
            setError('');
        } catch (error) {
            setError(error.message);
            setData(null);
        }
    }
    
    const handleSubmit = (event) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
        event.preventDefault();
        getData(url);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter a city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
            {error && <p>{error}</p>}
            {data && (
                <div className="forecast">
                    <h2>{data.name}</h2>
                    <p>Temperature: {data.main.temp} °C</p>
                    <p>Weather: {data.weather && data.weather[0].description}</p>
                    <p>Humidity: {data.main.humidity} %</p>
                </div>
            )}
        </div>
    );
}
