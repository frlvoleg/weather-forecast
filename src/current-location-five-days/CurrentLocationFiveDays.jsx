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

  return (
      <div>
          <SearchForLocation searchCity={city} onChangeSearch={handleSubmit} setSearchedCity={setCity}/>
          <h2>{city}</h2>
          <ul>
              {
                  cards.list.map((day) =>
                      <li key={day.dt}>{day.dt_txt} - Temperature {day.main.temp}°C</li>
                )
              }
       </ul>
    </div>
  )
}
