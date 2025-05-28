import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import humidity_icon from "../assets/humidity.png";
import rain_icon from "../assets/rain.png";
import search_icon from "../assets/search.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";

const BASE_URL = import.meta.env.VITE_APP_ID;

const allIcons = {
  "01d": clear_icon,
  "01n": clear_icon,
  "02d": cloud_icon,
  "02n": cloud_icon,
  "03d": cloud_icon,
  "03n": cloud_icon,
  "04d": drizzle_icon,
  "04n": drizzle_icon,
  "09d": rain_icon,
  "09n": rain_icon,
  "10d": rain_icon,
  "10n": rain_icon,
  "13d": snow_icon,
  "13n": snow_icon,
};

const Weather = () => {
  const [weatherData, setWeatherData] = useState(false);
  const inputRef = useRef();

  const search = async (city) => {
    console.log(city);

    if (!city) return alert("Enter City Name");

    const capitalized = city.replace(/\b\w/g, (match) => match.toUpperCase());

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${capitalized}&units=metric&appid=${BASE_URL}`
      );
      const data = await response.json();

      if (!response.ok) return alert(data.message);

      console.log(data);

      const icon = allIcons[data.weather[0].icon] || clear_icon;

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
        // icon: data.weather[0].icon, --- if you want to use icon from openweathermap.org
      });
    } catch (error) {
      setWeatherData(false);
      console.error("Error in fetching weather data");
    }
  };

  useEffect(() => {
    search("Mumbai");
  }, []);

  return (
    <div className="weather">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Search" />
        <img
          src={search_icon}
          alt=""
          onClick={() => search(inputRef.current.value)}
        />
      </div>
      {weatherData ? (
        <>
          {/* 
        <img
          src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
          alt="weather icon"
          className="weather-icon"
        /> --- if you want to use icon from openweathermap.org  */}
          <img
            src={weatherData.icon}
            alt="weather icon"
            className="weather-icon"
          />
          <p className="temperature">{weatherData.temperature}°c</p>
          <p className="location">{weatherData.location}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="" />
              <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="" />
              <div>
                <p>{weatherData.windSpeed} Km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Weather;
