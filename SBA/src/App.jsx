import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://rickandmortyapi.com/api/character')
        console.log(res.data);
        setCharacters(res.data.results);
        
      } catch (e) {
        console.error(e);
        
      }
    }
    fetchData()
  }, []);

  return (
    <>
      <h1>Rick and Morty Characters</h1>

      <div>
        {characters.map((character) => (
          <div key={character.id}>
            <h2>{character.name}</h2>
            <p>{character.species}</p>
            <img src={character.image} alt={character.name} width="100" />
          </div>
        ))}
      </div>
    </>
  )
}

export default App;
        
    