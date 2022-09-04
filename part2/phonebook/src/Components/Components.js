import React from 'react'

const Filter = ({searchInput, onChange}) => {
  return (
    <div>Filter shown with: <input value={searchInput} onChange={onChange}/></div>
  )
}

const PersonForm = ({onSubmit, nameValue, numberValue, nameOnChange, numberOnChange}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>name: <input value={nameValue} onChange={nameOnChange} /></div>
      <div>number: <input value={numberValue} onChange={numberOnChange} /></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

const Persons = ({persons}) => {
  return (
    <>
    { persons.map(person => <p key={person.id}>{person.name} {person.number}</p>) }
    </>
  )
}

export {Filter, PersonForm, Persons}