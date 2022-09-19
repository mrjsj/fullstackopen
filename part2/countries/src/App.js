import axios from 'axios'
import {useEffect, useState} from 'react'

const Country = ({id, country, handleClick}) => {
  return (
    <>
      <br/>{country.name.common} <button id={id} onClick={handleClick}>show</button>
    </>
  )
}

const TooManyCountries = () => {
  return (
    <>
      <br/>Too many countries! Narrow your search!
    </>
  )
}

const SingleCountry = ({country, weather}) => {
  
  return (
    <div>
      <h2>{country.name.common}</h2>
      capital {country.capital}<br/>
      area {country.area}
      <h3>Languages</h3>
      <ul>
      { Object.entries(country.languages).map(language => <li key={language[0]}>{language[1]}</li>) }
      </ul>
      <img width="20%" src={country.flags.svg} alt={'Flag of ' + country.name.common}/>
      <h3>Weather in {country.capital}</h3>
      temperature {weather.main.temp} Celcius<br/>
      <img alt={'weather symbol in' + country.capital} src={'http://openweathermap.org/img/wn/' + weather.weather[0].icon + '@2x.png'}/><br/>
      wind {weather.wind.speed} ms
    </div>
  )
}

function App() {
  const [countries, setCountries] = useState([])
  const [searchInput, setSearchInput] = useState("")
  const [countriesToShow, setCountriesToShow] = useState([])
  const [weather, setWeather] = useState({weather: [{icon: "02n"}], main: {temp: 0}, wind: {speed: 0}})

  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
        setCountriesToShow(response.data)
      })
  }, [])

  const weatherHook = (city) => {
    const request = 'http://api.openweathermap.org/data/2.5/weather?units=metric&q=' + city + '&appid=' + api_key 
    axios
      .get(request)
      .then(response => {
        setWeather(response.data)
      })
  }

  const handleSearch = (event) =>{
    setSearchInput(event.target.value)
    if (event.target.value !== ''){
      const tmpCountries = countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase())) 
      setCountriesToShow(tmpCountries)
      if (tmpCountries.length === 1) {
        weatherHook(tmpCountries[0].capital)
      }
    } else {
      setCountriesToShow(countries)
    }
  }

  const handleClick = (text) => {
    const tmpCountries = countries.filter(country => country.name.common.toLowerCase().includes(text.toLowerCase())) 
    setCountriesToShow(tmpCountries) 
    setSearchInput(text)
  }

  return (
    <div>
      search input <input id='search' onChange={handleSearch} value={searchInput?searchInput:''} type='text'/>
      {(() => {
        if (countriesToShow.length > 10) {
          return (<TooManyCountries />)
        } else if (countriesToShow.length === 1) {
          return (countriesToShow.map(country => <SingleCountry weather={weather} key={country.cca3} country={country}/>))
        } else if (countriesToShow.length > 1 && countriesToShow.length < 10) {
          return (countriesToShow.map(country => <Country handleClick={() => handleClick(country.name.common)} id={country.cca3} key={country.cca3} country={country}/>))
        }
        return null;
      })()}
    </div>
  );
}

export default App;
