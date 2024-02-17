import React, { useState, useEffect } from "react";
import "./WeatherApp.css";
import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import humidity_icon from "../Assets/humidity.png";

export const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [wicon, setWicon] = useState(cloud_icon);
  const api_key = "d5f73e6a3ff7669ea51da211228d7471";

  const search = async (city) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${api_key}`;

    try {
      let response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      let data = await response.json();

      if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
        setWicon(clear_icon);
      } else if (
        data.weather[0].icon === "02d" ||
        data.weather[0].icon === "02n"
      ) {
        setWicon(cloud_icon);
      } else if (
        data.weather[0].icon === "03d" ||
        data.weather[0].icon === "03n"
      ) {
        setWicon(drizzle_icon);
      } else if (
        data.weather[0].icon === "04d" ||
        data.weather[0].icon === "04n"
      ) {
        setWicon(rain_icon);
      } else if (
        data.weather[0].icon === "09d" ||
        data.weather[0].icon === "09n"
      ) {
        setWicon(cloud_icon);
      } else if (
        data.weather[0].icon === "010d" ||
        data.weather[0].icon === "010n"
      ) {
        setWicon(cloud_icon);
      } else if (
        data.weather[0].icon === "013d" ||
        data.weather[0].icon === "013n"
      ) {
        setWicon(snow_icon);
      } else {
        setWicon(clear_icon);
      }

      setWeatherData(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeatherData(null);
      setError("Error fetching weather data. Please try again.");
    }
  };

  useEffect(() => {
    search("London");
  }, []); 

  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder="Search"></input>
        <div className="search_icon" onClick={() => search(document.getElementsByClassName("cityInput")[0].value)}>
          <img src={search_icon} alt="" />
        </div>
      </div>
      {weatherData && (
        <>
          <div className="weather_image">
            <img src={wicon} alt="" />
          </div>
          <div className="weather-temp">{`${Math.round(weatherData.main.temp)}°C`}</div>
          <div className="weather-location">{weatherData.name}</div>
          <div className="data-container">
            <div className="element">
              <img src={humidity_icon} alt="" className="icon" />
              <div className="data">
                <div className="humidity-percent">{`${weatherData.main.humidity}%`}</div>
                <div className="text">Humidity</div>
              </div>
            </div>
            <div className="element">
              <img src={wind_icon} alt="" className="icon" />
              <div className="data">
                <div className="wind-rate">{`${Math.round(weatherData.wind.speed)} km/h`}</div>
                <div className="text">Wind Speed</div>
              </div>
            </div>
          </div>
        </>
      )}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};
