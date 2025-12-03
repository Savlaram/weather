import React, { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

import clear from "./Images/Clear.png";
import clouds from "./Images/Clouds.png";
import rain from "./Images/Rain.jpg";
import mist from "./Images/mist.png";
import errorImg from "./Images/error.png";

import "./App.css";

const Myapp = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const API_KEY = "ef8c9c988bbe0118d196506cddaa4c19";

  // Handle input change
  const handleInput = (event) => setSearch(event.target.value);

  // Fetch weather data
  const myFun = async () => {
    if (!search.trim()) {
      alert("Enter city or country");
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search.trim()}&appid=${API_KEY}&units=metric`
      );
      const jsonData = await response.json();

      if (jsonData.cod !== 200) {
        setError(true);
        setData(null);
        return;
      }

      setData(jsonData);
      setError(false);
    } catch (err) {
      console.error("Error fetching weather data:", err);
      setError(true);
      setData(null);
    }
  };

  // Map weather types to images
  const getWeatherImage = (weatherMain) => {
    if (!weatherMain) return errorImg;

    const weather = weatherMain.toLowerCase();

    // Clear
    if (weather === "clear") return clear;

    // Clouds
    if (weather === "clouds") return clouds;

    // Rain / Drizzle / Thunderstorm
    if (weather === "rain" || weather === "drizzle" || weather === "thunderstorm")
      return rain;

    // Mist / Smoke / Haze / Fog / Dust / Ash
    if (
      weather === "mist" ||
      weather === "smoke" ||
      weather === "haze" ||
      weather === "fog" ||
      weather === "dust" ||
      weather === "ash"
    )
      return mist;

    // Snow
    if (weather === "snow") return rain; // You can create a snow.png if you want

    // Unknown weather
    return errorImg;
  };

  return (
    <div className="container">
      <div className="inputs">
        <input
          placeholder="Enter city, country"
          onChange={handleInput}
          value={search}
        />
        <button onClick={myFun}>
          <FaMagnifyingGlass />
        </button>
      </div>

      <div>
        {error ? (
          <div className="weathers">
            <h2>City not found</h2>
            <img src={errorImg} alt="error" />
          </div>
        ) : data && data.weather ? (
          <div className="weathers">
            <h2>{data.name}</h2>
            <img src={getWeatherImage(data.weather[0].main)} alt="weather" />
            <h2>{Math.trunc(data.main.temp)}°C</h2>
            <h2>{data.weather[0].description}</h2>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Myapp;
