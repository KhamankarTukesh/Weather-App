import React, { useState } from 'react'
import { IoSearch } from "react-icons/io5"
import { WiHumidity, WiStrongWind } from "react-icons/wi"
import axios from 'axios'

const App = () => {
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)
  const [temperature, setTemperature] = useState(null)
  const [windSpeed, setWindSpeed] = useState(null)
  const [humidity, setHumidity] = useState(null)
  const [cityName, setCityName] = useState("")
  const [weatherIcon, setWeatherIcon] = useState("01d")

  const API_KEY = "2926afa6da0e9d367b4bb6bf289c4f98"

  const fetchWeather = async () => {
    if (!search) return
    setLoading(true)

    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${API_KEY}`
      )

      setTemperature(data.main.temp)
      setHumidity(data.main.humidity)
      setWindSpeed(data.wind.speed)
      setCityName(data.name)
      setWeatherIcon(data.weather[0].icon)
    } catch {
      setCityName("City Not Found ❌")
      setTemperature(null)
      setHumidity(null)
      setWindSpeed(null)
    }

    setLoading(false)
    setSearch("")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-700 px-4">
      
      {/* Card */}
      <div className="w-full max-w-sm bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl p-6 text-white">

        <h1 className="text-2xl font-semibold text-center mb-5">
          🌍 Weather Finder
        </h1>

        {/* Search */}
        <div className="flex bg-white rounded-full overflow-hidden mb-6">
          <input
            type="text"
            placeholder="Enter city name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 text-black outline-none"
          />
          <button
            onClick={fetchWeather}
            className="px-4 bg-blue-600 hover:bg-blue-700 transition text-white"
          >
            <IoSearch size={22} />
          </button>
        </div>

        {/* Weather Icon */}
        <div className="flex justify-center">
          <img
            src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
            alt="weather"
            className="w-24 h-24"
          />
        </div>

        {/* Temperature */}
        <h2 className="text-4xl font-bold text-center mt-2">
          {loading ? "Loading..." : temperature !== null ? `${temperature}°C` : "--"}
        </h2>

        <p className="text-center text-lg mt-1">
          {cityName || "Search a city"}
        </p>

        {/* Details */}
        <div className="flex justify-between mt-6">
          <div className="flex flex-col items-center">
            <WiHumidity size={36} />
            <span className="font-semibold">
              {humidity !== null ? `${humidity}%` : "--"}
            </span>
            <p className="text-sm opacity-80">Humidity</p>
          </div>

          <div className="flex flex-col items-center">
            <WiStrongWind size={36} />
            <span className="font-semibold">
              {windSpeed !== null ? `${windSpeed} m/s` : "--"}
            </span>
            <p className="text-sm opacity-80">Wind</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default App
