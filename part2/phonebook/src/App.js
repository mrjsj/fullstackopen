import { useEffect, useState } from 'react'
import { PersonForm, Filter, Persons } from './Components/Components'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [personsToShow, setPersonsToShow] = useState(persons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
        setPersonsToShow(response.data)
      })
  }
  useEffect(hook, [])

  console.log('render', persons.length, 'persons')

  const addName = (event) => {
    event.preventDefault()

    if (newName === '' || newNumber === ''){
      return
    }

    if (persons.filter(person => person.name === newName).length > 0) {
      alert(`${newName} already exists in phonebook`)
      return
    }

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
    setSearchInput('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) =>{
    setSearchInput(event.target.value)
    if (event.target.value !== ''){
      setPersonsToShow(persons.filter(person => person.name.toLowerCase().startsWith(event.target.value.toLowerCase())))
    } else {
      setPersonsToShow(persons)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchInput={searchInput} onChange={handleSearch} />
      <h2>Add a new</h2>
      <PersonForm onSubmit={addName} nameValue={newName} numberValue={newNumber} nameOnChange={handleNameChange} numberOnChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons persons={personsToShow}/>
    </div>
  )
}

export default App