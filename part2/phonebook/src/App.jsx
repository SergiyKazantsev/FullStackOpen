import {useState} from 'react'

const Filter = ({filter, setNewFilter}) => {
    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
    }

    return (
        <div>
            <p>Filter</p>
            <input value={filter} onChange={handleFilterChange}/>
        </div>
    )
}

const PersonForm = ({newName, setNewName, newNumber, setNewNumber, addName}) => {
    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    return (
        <form onSubmit={addName}>
            <div>
                Name: <input value={newName} onChange={handleNameChange}/>
                <br/>
                Number: <input value={newNumber} onChange={handleNumberChange}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

const Persons = ({persons, filter}) => {
    return (
        <>
            {persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()) || filter === '')
                .map(person => (<p key={person.name}>{person.name} {person.number}</p>))}
        </>
    )
}

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas', number: '040-123456'},
        {name: 'Ada Lovelace', number: '39-44-5323523'},
        {name: 'Dan Abramov', number: '12-43-234345'},
        {name: 'Mary Poppendieck', number: '39-23-6423122'}
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setNewFilter] = useState('')


    const addName = (event) => {
        event.preventDefault()

        if (persons.filter((person) => (person.name === newName || person.number === newNumber)).length > 0) {
            alert(`${newName} or his number is already added to phonebook`)
            return
        }
        setPersons(persons.concat({name: newName, number: newNumber}))
        setNewName('')
        setNewNumber('')
    }
    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filter={filter} setNewFilter={setNewFilter}/>
            <h3>Add a new</h3>
            <PersonForm newName={newName} setNewName={setNewName} newNumber={newNumber}
                        setNewNumber={setNewNumber} addName={addName}/>
            <h2>Numbers</h2>
            <Persons persons={persons} filter={filter}/>
        </div>
    )
}

export default App