import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Card from './components/card';

const App = () => {
  const [allPokeData, setallPokeData] = useState([]);

  async function getPokeData() {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0"
    );

    const pokemonList = response.data.results;

    const detailedPokemon = await Promise.all(
      pokemonList.map(async (pokemon) => {
        const res = await axios.get(pokemon.url);
        return res.data;
      })
    );

    setallPokeData(detailedPokemon);
  }

  useEffect(() => {
    getPokeData();
  }, []);



  return (
    <div className='min-h-screen w-full bg-black p-4 flex flex-wrap gap-4 justify-center'>
      {allPokeData.map((pokemon)=>(
        <Card key={pokemon.id} data={pokemon}/>
        
        
      ))}
      
    </div>
  )
};

export default App
  //         <img
  // src={allPokeData[0].sprites.other["official-artwork"].front_default}
  // alt={allPokeData[0].name}