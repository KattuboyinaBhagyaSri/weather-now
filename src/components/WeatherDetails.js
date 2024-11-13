import { useEffect, useState } from "react";
import { WiCloud } from "weather-icons-react";
import { WiRainMix } from "weather-icons-react";
import { WiHumidity } from "weather-icons-react";
import { WiWindy } from "weather-icons-react";
import { WiNightClear } from "weather-icons-react";

const WeatherDetails = ({ selectedCityData }) => {
  const { latitude, longitude, name } = selectedCityData;
  const [weatherData, setWeatherData] = useState("");
  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather&hourly=relative_humidity_2m&hourly=cloudcover,precipitation`
      );
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };
  const cloudCover = weatherData?.hourly?.cloudcover[0]; // Cloudiness in percentage
  const precipitation = weatherData?.hourly?.precipitation[0]
    ? weatherData?.hourly?.precipitation["1h"] || 0
    : 0; // Rainfall in mm (last 1 hour)

  let condition = "";
  if (cloudCover > 70) {
    condition = "CLOUDY";
  } else if (precipitation > 0) {
    condition = "RAINY";
  }  else {
    condition = "CLEAR";
  }
  return (
    <div>
      <div className="bg-[#001d35] rounded-md w-[50%] m-auto p-4 h-96">
        <h3 className="text-center text-white font-bold">
          Weather for {name} - {weatherData?.current_weather?.temperature}°
        </h3>
        <div className="text-center flex flex-col justify-center items-center p-2 text-white font-bold">
          <h4>
            {condition === "CLOUDY" && <WiCloud size={100} color="#fff" />}{" "}
          </h4>
          <h4>
            {condition === "RAINY" && <WiRainMix size={100} color="#fff" />}
          </h4>
          <h4>
            {condition === "CLEAR" && <WiNightClear size={100} color="#fff" />}
          </h4>
          <h4>{condition}</h4>
        </div>
        <div className="flex text-[#001d35] m-4 justify-between">
          <div className="bg-white rounded-full w-5/12 p-4 font-bold flex flex-col text-center m-2 justify-center items-center">
            <div>Wind Speed:{weatherData?.current_weather?.windspeed}km/h</div>
            <div>
              <WiWindy size={70} color="#001d35" />
            </div>
          </div>
          <div className="bg-white rounded-full w-5/12 p-4 font-bold flex flex-col text-center m-2 justify-center items-center">
            <div>
              Humidity:{weatherData?.hourly?.relative_humidity_2m
                ? weatherData?.hourly?.relative_humidity_2m[0]
                : " N/A"}
              %
            </div>
            <div>
              <WiHumidity size={70} color="#001d35" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;
