import { Pokemon, PokemonListResponse } from '@/types/pokemon';

const POKEAPI_ENDPOINT = 'https://pokeapi.co/api/v2/pokemon?limit=151';

export async function getFirstGenerationPokemon(): Promise<Pokemon[]> {
  try {
    const response = await fetch(POKEAPI_ENDPOINT);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: PokemonListResponse = await response.json();
    
    const pokemonDetails = await Promise.all(
      data.results.map(async (pokemon) => {
        try {
          const detailResponse = await fetch(pokemon.url);
          if (!detailResponse.ok) {
            throw new Error(`Failed to fetch ${pokemon.name}`);
          }
          return await detailResponse.json() as Pokemon;
        } catch (error) {
          console.error(`Error fetching ${pokemon.name}:`, error);
          return null;
        }
      })
    );
    
    return pokemonDetails.filter((pokemon): pokemon is Pokemon => pokemon !== null);
  } catch (error) {
    console.error('Error fetching Pokemon data:', error);
    throw error;
  }
}
