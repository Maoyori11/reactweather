import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import Loader from './component/Loader'
import WeatherCard from './components/WeatherCard'

function App() {
  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temperature, setTemperature] = useState()

  
  useEffect(() => {
    // Esta es la función que se ejecuta cuando llega la información de nuestra ubicación
    const success = pos => {
      const obj = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      }
      setCoords(obj);
    }
    // Esta hace el llamado a la api del navegador, para usar la ubicación actual
    navigator.geolocation.getCurrentPosition(success)
  }, [])

  

// -----------------Petición del Clima-----------------

useEffect(() => {
  if (coords) {
    const APIKEY = `eb530268f500070f05a240d902fbf8c8`
    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${APIKEY}`
    
    axios.get(URL)
      .then(res => {
        const celsius = (res.data.main.temp - 275.15).toFixed(0)
        const fahrenheit  = (celsius *9 / 5 + 32).toFixed(0)
        setTemperature ({celsius, fahrenheit})
        setWeather(res.data)
      })
      .catch(err => console.log(err))
  }

}, [coords])

console.log(weather);


  return (
    <div className='App'>
      { 
      weather?
      <WeatherCard weather = {weather} temperature = {temperature}/>
      :
      <Loader/>
      }
    </div>
  )
}

export default App
