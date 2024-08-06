import { useEffect, useState } from "react"
import SearchForLocation from "../search-for-location/SearchForLocation";


export default function FiveDays() {
    const [cards, setCards] = useState(null);
    const [city, setCity] = useState('');

    const API_KEY = 'af75452408ee4c5895e11d2b1eef7026';

    useEffect(() =>{
        navigator.geolocation.getCurrentPosition(async (position) => {
          const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_KEY}&units=metric`;
            getData(url);
    })
    },[])

    async function getData(url) {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Not ok");
                }
                const data = await response.json();
                setCards(data);
                setCity(data.city.name);
            }
            catch (error) {
                console.error('Fetching error: ', error);
            }
    }

       const handleSubmit = (event) => {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;
        event.preventDefault();
        getData(url);
    }
    
 if (!cards) {
        return <div>Loading...</div>;
    }

    const sortDays = cards.list.reduce((acc, day) => {
        const date = day.dt_txt.split(' ')[0];
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push({ dt_txt: day.dt_txt, temp: day.main.temp });
        return acc;
    },{})

return (
    <div>
        <SearchForLocation searchCity={city} onChangeSearch={handleSubmit} setSearchedCity={setCity}/>
        <h2>{city}</h2>
            {
            Object.keys(sortDays).map((date) => (
                <div className="day" key={date}>
                    <h3>{date}</h3>
                    {sortDays[date].map((detail, index) => (
                        <div key={index}>
                            {detail.dt_txt} - Temperature {detail.temp}°C
                        </div>
                    ))}
            </div>
        ))
            }
    </div>
)
}
