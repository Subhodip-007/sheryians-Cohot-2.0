import React from 'react'

const card = (props) => {
   const typeColors = {
  grass: "#78C850",
  fire: "#F08030",
  water: "#6890F0",
  electric: "#F8D030",
  psychic: "#F85888",
  ice: "#98D8D8",
  dragon: "#7038F8",
  dark: "#705848",
  fairy: "#EE99AC",
  normal: "#A8A878",
  fighting: "#C03028",
  flying: "#A890F0",
  poison: "#A040A0",
  ground: "#E0C068",
  rock: "#B8A038",
  bug: "#A8B820",
  ghost: "#705898",
  steel: "#B8B8D0"
  
}; 
const primaryType = props.data.types[0].type.name;
const cardColor = typeColors[primaryType];

    
  return (
   <div className="
  w-80 rounded-3xl p-3
  border-[8px]
  border-yellow-300
  shadow-2xl
  backdrop-blur-sm
  hover:scale-105
  hover:rotate-1
  transition-all duration-300
  relative overflow-hidden
" style={{
  background: `linear-gradient(
    to bottom,
    ${cardColor},
    white
  )`
}} >

  {/* Top Bar */}
  <div className="flex justify-between items-center mb-3">
    <h2 className="text-2xl font-bold">{props.data.name}</h2>
    <div className="bg-red-500 text-white px-2 py-1 rounded-full font-bold">
      HP {props.data.stats[0].base_stat}
    </div>
  </div>

  {/* Pokemon Image */}
  <div className="h-52 w-full rounded-2xl overflow-hidden border-4 border-yellow-400 shadow-inner bg-white">
   <img
  className="h-full w-full object-contain p-2 drop-shadow-xl"
  src={props.data.sprites.other["official-artwork"].front_default}
  alt={props.data.name}
/>
  </div>

  {/* Type */}
  <div className="mt-3 flex justify-center">
    <span
  className="px-4 py-1 rounded-full font-semibold text-white capitalize"
  style={{
    backgroundColor:
      typeColors[props.data.types[0].type.name]
  }}
>
  {props.data.types[0].type.name}
</span>
  </div>

  {/* Abilities */}
  <div className="mt-4 bg-white/70 rounded-xl p-3 space-y-2">
    <div className="border-b pb-2">
      <h3 className="font-bold text-lg">{props.data.abilities[0]?.ability.name}</h3>
      <p className="text-sm text-gray-700">
        
      </p>
    </div>

    <div>
      <h3 className="font-bold text-lg">{props.data.abilities[1]?.ability.name}</h3>
      <p className="text-sm text-gray-700">
        
      </p>
    </div>
  </div>

  {/* Bottom Stats */}
  <div className="mt-4 flex justify-between bg-black text-white rounded-xl p-3">
    <div>
      <p className="text-xs">Attack</p>
      <p className="font-bold">{props.data.stats[1].base_stat}</p>
    </div>

    <div>
      <p className="text-xs">Defense</p>
      <p className="font-bold">{props.data.stats[2].base_stat}</p>
    </div>

    <div>
      <p className="text-xs">Speed</p>
      <p className="font-bold">{props.data.stats[5].base_stat}</p>
    </div>
  </div>
</div>
  )
}

export default card
