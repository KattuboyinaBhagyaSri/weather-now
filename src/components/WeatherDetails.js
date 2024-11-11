import { useEffect, useState } from "react";
const WeatherDetails = ({selectedCityData}) =>{
   console.log(selectedCityData);
   const {latitude,longitude,name} = selectedCityData
   const [weatherData,setWeatherData] = useState("")
   useEffect(()=>{
    fetchWeatherData()
   },[])

   const fetchWeatherData = async() =>{
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`)
      const json = await response.json()
      console.log(json);
      setWeatherData(json?.current_weather)        
   }
    return (
        <div>
          <h3>Weather for {name}</h3>
          <p>Temparature:{weatherData.temperature}</p>

          {/* <p>Temparature:{weatherData.current_weather.temperature}{weatherData.current_weather_units.temperature}</p> */}
          <p></p>
          <p></p>
          <p></p>

        </div>
    )
}

export default WeatherDetails