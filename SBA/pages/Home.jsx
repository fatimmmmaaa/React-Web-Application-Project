import { useState, useEffect, useContext } from "react";
import { GenreContext } from "../contexts/GenreContexts"; 
import Episode from "../components/Episode"; 
import Character from "../components/Character"; 
import Location from "../components/Location"; 
import CharacterSearchForm from "../components/CharacterSearchForm"; 
import {
  getCharacterDetails,
  getCharactersBySearch,
  getCharactersBySpecies,
  getCharactersBySearchAndSpecies,
  getEpisodeDetails,
  getLocationDetails
} from "../services/rickandmortyapi"; 

export default function Home() {
  const [characters, setCharacters] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [locations, setLocations] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [popupCharacter, setPopupCharacter] = useState(null); 
  const { selectedSpecies } = useContext(GenreContext); 

  // Fetch data
  useEffect(() => {
    async function fetchData() {
      try {
        let characterData;

        if (searchTerm && selectedSpecies) {
          characterData = await getCharactersBySearchAndSpecies(selectedSpecies, searchTerm);
        } else if (searchTerm) {
          characterData = await getCharactersBySearch(searchTerm);
        } else if (selectedSpecies) {
          characterData = await getCharactersBySpecies(selectedSpecies);
        } else {
          characterData = await getCharacterDetails();
        }
        setCharacters(characterData);

        
        const episodeData = await getEpisodeDetails();
        const locationData = await getLocationDetails();
        setEpisodes(episodeData);
        setLocations(locationData);
        
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }

    fetchData();
  }, [selectedSpecies, searchTerm]); 

  function handlePopUpClose(e) {
    if (e.target.className === "popup-overlay") {
      setPopupCharacter(null);
    }
  }

  return (
    <div className="Home">
      <h1>Rick and Morty</h1>

      <CharacterSearchForm setSearchTerm={setSearchTerm} /> 

      {/* Display Characters */}
      <div className="characters">
        {characters.length > 0 ? (
          characters.map((character) => (
            <div key={character.id}>
              <Character
                character={character}
                onLearnMore={() => setPopupCharacter(character)} 
              />
            </div>
          ))
        ) : (
          <p>No characters found. Try a different search.</p>
        )}
      </div>

      {/* Display Episode */}
      <div className="episodes">
        {episodes.length > 0 ? (
          episodes.map((episode) => (
            <div key={episode.id}>
              <Episode episode={episode} /> 
            </div>
          ))
        ) : (
          <p>No episodes found.</p>
        )}
      </div>

      {/* Display Location */}
      <div className="locations">
        {locations.length > 0 ? (
          locations.map((location) => (
            <div key={location.id}>
              <Location location={location} />
            </div>
          ))
        ) : (
          <p>No locations found.</p>
        )}
      </div>

      {/* Character Popup */}
      {popupCharacter && (
        <div className="popup-overlay" onClick={handlePopUpClose}>
          <div className="popup-content">
            <CharacterPopUp character={popupCharacter} /> 
            <button onClick={() => setPopupCharacter(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
