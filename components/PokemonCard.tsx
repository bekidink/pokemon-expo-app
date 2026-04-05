import React, { memo, useMemo } from "react";
import { Text, Image, TouchableOpacity, View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { capitalize } from "@/utils/formatters";


export default memo(function PokemonCard({ pokemon }: { pokemon: any }) {
  const router = useRouter();
  
  
  const id = useMemo(() => {
    return pokemon.url.split("/").filter(Boolean).pop()!;
  }, [pokemon.url]);

  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  return (
    <TouchableOpacity 
      activeOpacity={0.7}
      onPress={() => router.push(`/pokemon/${pokemon.name}`)} 
      style={styles.cardContainer}
      accessibilityRole="button"
    >
      <View className="bg-white rounded-2xl p-4 items-center shadow-sm border border-gray-100">
        <Text className="absolute right-3 top-2 text-gray-300 font-bold text-xs">
          #{id.padStart(3, "0")}
        </Text>
        
        <Image 
          source={{ uri: imageUrl }} 
          className="w-28 h-28 mt-2" 
          resizeMode="contain"
        />
        
        <Text className="text-md font-bold text-gray-800 mt-2">
          {capitalize(pokemon.name)}
        </Text>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  cardContainer: {
    flex: 0.5,
    margin: 8,
  }
});