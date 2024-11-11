import { useEffect, useState } from "react"
import WeatherDetails from "./WeatherDetails"
const Header = () => {
    const [city, setCity] = useState("")
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [selectedCity,setSelectedCity] = useState(null)
    let timeOutId = null;
    const handleCityChange = (e) => {
        setCity(e.target.value)
        if (timeOutId)
            clearTimeout(timeOutId)

        timeOutId = setTimeout(() => {
            if (e.target.value.trim()) {
                fetchcityData(e.target.value)
            }
        }, 500)
    }
    useEffect(() => {
        fetchcityData()
    }, [])
    const fetchcityData = async (cityName) => {
        setLoading(true)
        setError(null)
        try {
            const cityData = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`)
            const json = await cityData.json()
            if (json?.results) {
                setResults(json?.results)
            }
            else {
                setResults([])
            }

        }
        catch (error) {
            setError("Error while fecthing city data")
        }
        finally {
            setLoading(false)
        }

    }
    const handleSelectedCity = (cityData)=>{
        setSelectedCity(cityData)
    }

    return (
        <div>
            <div className="text-blue-400 text-center font-bold m-2 p-2">Weather Now</div>
            <div>
                <input className="border border-blue-400 p-2 my-2 mx-4 rounded-lg w-8/12" type="text"
                    placeholder="Search for preferred city..."
                    value={city}
                    onChange={(e) => handleCityChange(e)}
                />
                {loading && <p className="p-2 m-4 text-blue-400">Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {selectedCity === null && results.length> 0 && (
                     <ul className=" p-2 m-4 ">
                     {results && results.length > 0 ? (results.map((city) => (<li key={city.id} className="p-2">
                         <button type="button" onClick={()=>handleSelectedCity(city)}>{city.name}, {city.country}</button></li>))) : <li></li>}
                 </ul>
                )}
               
                <div className="p-2 m-2">Current Location (Gps)</div>
                 {selectedCity && <WeatherDetails selectedCityData={selectedCity}/>}
            </div>
        </div>
    )
}

export default Header