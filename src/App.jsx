import React, { useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { WiHumidity } from "react-icons/wi";
import { WiStrongWind } from "react-icons/wi";
import axios from 'axios';

const App = () => {

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [temparture, setTemparature] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [cityName, setCityName] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("01d");

  const API_KEY = "2926afa6da0e9d367b4bb6bf289c4f98";

  const fetchWeather = async () => {
    if (!search) return;
    setLoading(true);
    try {
      const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${API_KEY}`);
      console.log(data);
      if (data.cod == 200) {
        setTemparature(data.main.temp);
        setHumidity(data.main.humidity);
        setWindSpeed(data.wind.speed);
        setCityName(data.name);
        setWeatherIcon(data.weather[0].icon);
      }
    } catch (e) {
      console.log(e);
      setCityName("City Not Found!!");
      setTemparature(null);
      setHumidity(null);
      setWindSpeed(null);
      setWeatherIcon("01d");
    }
    setLoading(false);
    setSearch("");
  }
  return (
    <>
      <div className='flex flex-col items-center justify-center h-screen bg-gradient-to-br from-green-950 text-white'>
        <h1 className='py-4 text-2xl text-black font-serif flex justify-center items-center'>Enter City Name To Find Temperature</h1>
        {/* Search bar  icons */}
        <div className='flex items-center bg-white rounded-full px-4 py-2 mb-6 w-80 shadow-lg'>
          <input
            type="text"
            placeholder='Search'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='flex-1 outline-none px-2 text-black'
          />
          <IoSearch onClick={fetchWeather} className='text-gray-500 cursor-pointer' />
        </div>


        {/* weather icon */}
        <img
          src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
          alt="weather"
          className='w-20 h-20 mb-4'
        />


        {/* Temparture & wind speed */}
        <h1 className='text-4xl font-bold'>
          {loading ? "loading..." : temparture !== null ? `${temparture}°C` : "--"}
        </h1>

        <h2 className='text-2xl mt-2 font-semibold'>{cityName || "type to check tempearture"}</h2>

        {/* humidity & wid speed */}
        <div className='w-full max-w-md mt-7 flex flex-col md:flex-row items-center  justify-between md:items-start'>
          <div className='flex flex-col items-center '>
            {<WiHumidity className='text-3xl' />}
            <span className='text-lg font-medium'>{humidity !== null ? `${humidity}%` : "--"}</span>
            <p className='text-sm text-black'>Humidity</p>
          </div>
          <div className='flex flex-col items-center'>
            {<WiStrongWind className='text-3xl' />}
            <span className='text-lg font-medium'>{windSpeed !== null ? `${windSpeed}km/h` : "--"}</span>
            <p className='text-sm text-black'>Wind Speed</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default App