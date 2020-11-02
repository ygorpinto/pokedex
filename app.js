
const fetchpokemon = () => {
    const urlpokemon = id => `https://pokeapi.co/api/v2/pokemon/${id}` 
    const pokemonpromises = [];
    for (let i = 1; i<=150 ; i++)
    {
     pokemonpromises.push(fetch(urlpokemon(i)).then(response => response.json()))
    }  

    Promise.all(pokemonpromises)
    .then(pokemon => {
        const pokelist = pokemon.reduce((accumulator,pokemon)=>{
            const types = pokemon.types.map(typeinfo => typeinfo.type.name)
            accumulator += 
            `<li class = "card ${types[0]}">
            <img class = "card-image" alt="${pokemon.name}" src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png">
                <h2 class = "title"> ${pokemon.id}.${pokemon.name}</h2>
                <p class = "card-subtitle">${types.join(" | ")}</p>
            </li>`

            return accumulator
        }, "")

        const ul = document.querySelector('[data-js="pokedex"]')


        ul.innerHTML = pokelist    
    
    })
}


fetchpokemon()