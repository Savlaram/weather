import React, { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
// import clear from "../Images/Clear.png";
import clear from "../src/Images/Clear.png"
// import clouds from "../Images/Clouds.png";
import clouds from "../src/Images/cloude.png"
// import rain from "../Images/Rain.png";
import rain from "../src/Images/Rain.jpg"
// import errorImg from "../Images/error.png";
import errorImg from "../src/Images/error.png";
// import mist from "../Images/mist.png";--
import mist from "../src/Images/mist.png";
import "./App.css";

const Myapp = () => {
  const [search, setSearch] = useState("");
  const [data, setdata] = useState();
  const [error, seterror] = useState();
  const API_KEY = "ef8c9c988bbe0118d196506cddaa4c19";

  const handleInput = (event) => {
    setSearch(event.target.value);
  };

  const myFun = async () => {
    if (!search.trim()) {
      alert("Enter city or country");
      return;
    }
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}&units=metric`
      );
      const jsonData = await response.json();
      console.log(jsonData);
      setdata(jsonData);

      if (search == "") {
        alert("enter city or country");
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div>
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
          {data && data.weather ? (
            <div className="weathers">
              <h2>{data.name}</h2>
              <img
                src={
                  data.weather[0].main === "Clouds"
                    ? clouds
                    : data.weather[0].main === "Clear"
                    ? clear
                    : data.weather[0].main === "Rain"
                    ? rain
                    : data.weather[0].main === "Mist"
                    ? mist
                    : errorImg
                }
                alt="weather icon"
              />

              <h2>{Math.trunc(data.main.temp)}°C</h2>
              <h2>{data.weather[0].description}</h2>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Myapp;