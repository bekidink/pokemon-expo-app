import { useQuery } from "@tanstack/react-query";
import { pokeApi } from "@/services/pokeApi";

export const usePokemonDetail = (name: string) => {
  return useQuery({
    queryKey: ["pokemon", name],
    queryFn: () => pokeApi.getPokemonByName(name),
    enabled: !!name,
  });
};