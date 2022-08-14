import React, { useState } from 'react'

const Dico = ({ onSearch }) => {

  const items = ['Maison', 'Mariage', 'Ordinateur', 'Pelouse', 'Piscine']

  const [ filteredItems, setFiltereditems ] = useState(items)

  const [ search, setSearch ] = useState('')

  const handleSearchChange = (event) => {
    setSearch(event.target.value.toLowerCase())
  }

  const handleButtonClick = () => {
    if(typeof onSearch === 'function') onSearch(search)

    if(search === '') setFiltereditems(items)
    else setFiltereditems(items.filter(item => item.toLowerCase().startsWith(search)))
  }

  return (
    <>
      <h1>Dictionnaire</h1>

      <input type="text" value={search} onChange={handleSearchChange} />
      
      <button onClick={handleButtonClick}>Chercher</button>

      <ul>
        {filteredItems.map(item => <li key={item}>{item}</li>)}
      </ul>
    </>
  )
}

export default Dico