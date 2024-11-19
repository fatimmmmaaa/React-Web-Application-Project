import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [characters, setCharacters] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [locations, setLocations] = useState([]);


//fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const characterRes = await axios.get('https://rickandmortyapi.com/api/character');
        const episodeRes = await axios.get('https://rickandmortyapi.com/api/episode');
        const locationRes = await axios.get('https://rickandmortyapi.com/api/location');

        setCharacters(characterRes.data.results);
        setEpisodes(episodeRes.data.results);
        setLocations(locationRes.data.results);
        
      } catch (e) {
        console.error(e);
        
      }
    }
    fetchData()
  }, []);

  return (
    <>
      <h1>Rick and Morty Database</h1>

      {/* Character */}
      <div className="section">
        <h2>Characters</h2>
        <div className="cards">
          {characters.map((character) => (
            <div key={character.id} className="card">
              <h3>{character.name}</h3>
              <p>{character.species}</p>
              <img src={character.image} alt={character.name} width="100" />
            </div>
          ))}
        </div>
      </div>

      {/* Episodes */}
      <div className="section">
        <h2>Episodes</h2>
        <div className="cards">
          {episodes.map((episode) => (
            <div key={episode.id} className="card">
              <h3>{episode.name}</h3>
              <p>{episode.air_date}</p>
              <p>Episode: {episode.episode}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Locations */}
      <div className="section">
        <h2>Locations</h2>
        <div className="cards">
          {locations.map((location) => (
            <div key={location.id} className="card">
              <h3>{location.name}</h3>
              <p>{location.type}</p>
              <p>{location.dimension}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;