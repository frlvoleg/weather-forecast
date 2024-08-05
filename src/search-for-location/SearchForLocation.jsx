export default function SearchForLocation({searchCity, onChangeSearch,setSearchedCity}) {
  return (
    <div><form onSubmit={onChangeSearch}>
                <input
                    type="text"
                    placeholder="Enter a city"
                    value={searchCity}
                    onChange={(e) => setSearchedCity(e.target.value)}
                />
                <button type="submit">Search</button>
            </form></div>
  )
}
