import { useQuery } from "@tanstack/react-query";
import { pokeApi } from "@/services/pokeApi";

export const usePokemonList = () => {
  return useQuery({
    queryKey: ["pokemonList"],
    queryFn: () => pokeApi.getPokemonList(151),
  });
};