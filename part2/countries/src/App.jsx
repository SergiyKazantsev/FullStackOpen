import {useCallback, useEffect, useState} from 'react'
import axios from "axios";

const Countries = ({countries, countryName, handleShow, weather, handleWeather}) => {
    if (countries.length !== 1) {
        countries = countries.filter(country => country.name.common.toLowerCase().includes(countryName.toLowerCase()))
    }

    if (countries.length > 10) {
        return <p>Too many matches, specify another filter</p>
    } else if (countries.length === 1) {
        const country = countries[0]
        const languagesArray = Object.values(country.languages)
        return (
            <>
                <h1>{country.name.common}</h1>
                <p>Capital: {country.capital[0]}</p>
                <p>Area: {country.area}</p>
                <img src={country.flags.png} alt={country.flags.alt}/>
                <h2>Languages</h2>
                <ul>
                    {languagesArray.map(language => <li key={language}>{language}</li>)}
                </ul>
                <Weather country={country} weather={weather} handleWeather={handleWeather}/>
            </>
        )
    } else {
        return (
            <>
                {countries.map(country => (
                    <div key={country.name.common} style={{display: 'flex'}}>
                        <p>{country.name.common}</p>
                        <button value={country.name.common} onClick={handleShow}>Show</button>
                    </div>
                ))}
            </>)
    }

}

const Weather = ({country, weather, handleWeather}) => {
    const capital = country.capital?.[0]
    useEffect(() => {
        if (capital) {
            handleWeather(capital)
        }
    }, [capital, handleWeather])
    if (!weather || !weather.main || !weather.wind) {
        return <p>Loading weather data...</p>
    }
    return (
        <>
            <h2>Weather in {capital}</h2>
            <p>Temperature: {weather.main.temp} °C</p>
            {weather.weather?.[0] && (
                <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt={weather.weather[0].description}
                />
            )}
            <p>Wind: {weather.wind.speed} m/s</p>
        </>
    )
}

function App() {
    const [countries, setCountries] = useState(null)
    const [countryName, setCountryName] = useState('')
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        axios.get('https://studies.cs.helsinki.fi/restcountries/api/all').then(response => setCountries(response.data))
    }, [])

    const handleCountryNameChange = (event) => {
        if (!event.target.value.toLowerCase().includes(countryName.toLowerCase())) {
            axios.get('https://studies.cs.helsinki.fi/restcountries/api/all').then(response => setCountries(response.data))
        }
        setCountryName(event.target.value)
    }

    const handleShow = (event) => {
        axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${event.target.value}`).then(response => {
            setCountries([response.data])
        })
    }

    const handleWeather = useCallback((capitalCity) => {
        if (!capitalCity) return

        const api_key = import.meta.env.VITE_SOME_KEY
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${capitalCity}&units=metric&appid=${api_key}`

        axios
            .get(url)
            .then(response => {
                setWeather(response.data)
            })
            .catch(error => {
                console.error("Error fetching weather data:", error)
            })
    }, [])


    if (!countries || countryName === '') {
        return (
            <>
                Country name: <input onChange={handleCountryNameChange}/>
            </>
        )
    } else {
        return (
            <>
                Country name: <input onChange={handleCountryNameChange}/>
                <Countries countries={countries} countryName={countryName} handleShow={handleShow} weather={weather}
                           handleWeather={handleWeather}/>
            </>
        )
    }
}

export default App
