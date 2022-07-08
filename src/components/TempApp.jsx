import React, { useState, useEffect } from "react";
import "../components/TempApp.css";
import WeatherCard from "./WeatherCard";

const TempApp = () => {
  const [search, setSearch] = useState("Surat");
  const [tempInfo, setTempInfo] = useState({});

  const inputEvent = (e) => {
    setSearch(e.target.value);
  };

  const weatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=ae93ace8d9fc61a314e2937a9ee96327`;
      const res = await fetch(url);
      const data = await res.json();

      const { temp, humidity, pressure } = data.main;
      const { main: weatherMood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      const myNewWeather = {
        temp,
        humidity,
        pressure,
        weatherMood,
        name,
        country,
        speed,
        sunset,
      };

      setTempInfo(myNewWeather);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    weatherInfo();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="Search..."
            autoFocus
            value={search}
            className="searchTerm"
            onChange={inputEvent}
          />
          <button className="searchButton" type="button" onClick={weatherInfo}>
            Search
          </button>
        </div>
      </div>

      <WeatherCard tempInfo={tempInfo} />
    </>
  );
};

export default TempApp;
