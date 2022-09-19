import axios from 'axios'
import {useEffect, useState} from 'react'

const Country = ({country}) => {
  return (
    <>
      <br/>{country.name.common} <button name='Hello'/>
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

const SingleCountry = ({country}) => {
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
    </div>
  )
}

function App() {
  const [countries, setCountries] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [countriesToShow, setCountriesToShow] = useState([])

  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
        setCountriesToShow(response.data)
      })
  }
  useEffect(hook, [])

  const handleSearch = (event) =>{
    setSearchInput(event.target.value)
    if (event.target.value !== ''){
      setCountriesToShow(countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase())))
    } else {
      setCountriesToShow(countries)
    }
  }

  return (
    <div>
      find countries <input onChange={handleSearch} value={searchInput} />
      { countriesToShow.length > 10 ? <TooManyCountries /> : null }
      { countriesToShow.length === 1 ? countriesToShow.map(country => <SingleCountry key={country.cca3} country={country}/>) : null }
      { countriesToShow.length > 1 && countriesToShow.length < 10 ? countriesToShow.map(country => <Country key={country.cca3} country={country}/>) : null}
    </div>
  );
}

export default App;
