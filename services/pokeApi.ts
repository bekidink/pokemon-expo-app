import { Pokemon, PokemonListItem } from "@/types/pokemon";

const BASE_URL = "https://pokeapi.co/api/v2";

export const pokeApi = {
  async getPokemonList(limit = 151, offset = 0): Promise<PokemonListItem[]> {
    const res = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
    const data = await res.json();
    return data.results;
  },

  async getPokemonByName(name: string): Promise<Pokemon> {
    const res = await fetch(`${BASE_URL}/pokemon/${name.toLowerCase()}`);
    if (!res.ok) throw new Error("Pokemon not found");
    return res.json();
  },
};