import React, { useMemo } from "react";
import { View, Text, Image, ScrollView, StyleSheet, Dimensions } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { usePokemonDetail } from "@/hooks/usePokemonDetail";
import { Card, IconButton, ProgressBar } from "react-native-paper";
import { formatHeight, formatWeight, capitalize } from "@/utils/formatters";
import { TYPE_COLORS } from "@/types/pokemon";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorState from "@/components/ErrorState";


export default function PokemonDetail() {
  const { name } = useLocalSearchParams<{ name: string }>();
  const { data: pokemon, isLoading, error } = usePokemonDetail(name!);

  // Compute theme color based on primary type
  const primaryType = pokemon?.types[0]?.type.name;
  const themeColor = useMemo(() => 
    TYPE_COLORS[primaryType as keyof typeof TYPE_COLORS] || "#607D8B", 
    [primaryType]
  );

  if (isLoading) return <LoadingSpinner />;
  if (error || !pokemon) return <ErrorState onRetry={() => router.back()} />;

  const mainImage = pokemon.sprites.other["official-artwork"].front_default;

  // Helper for Stat bar colors
  const getStatColor = (value: number) => {
    if (value < 50) return "#FF5252";
    if (value < 90) return "#FFC107";
    return "#4CAF50";
  };

  return (
    <View className="flex-1 bg-white">
     
      
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        {/* Hero Header */}
        <View style={[styles.header, { backgroundColor: themeColor }]}>
          
          <View className="flex-row justify-between items-center px-4 mt-10">
            <IconButton
            icon="arrow-left"
            iconColor="white"
            size={28}
            onPress={() => router.back()}
            
          />
            <Text className="text-white text-4xl font-extrabold">{capitalize(pokemon.name)}</Text>
            <Text className="text-white/60 text-xl font-bold">#{pokemon.id.toString().padStart(3, "0")}</Text>
          </View>

          <View className="flex-row px-6 gap-2 mt-2">
            {pokemon.types.map((t) => (
              <View key={t.type.name} className="bg-white/20 px-4 py-1 rounded-full border border-white/30">
                <Text className="text-white text-xs font-bold uppercase">{t.type.name}</Text>
              </View>
            ))}
          </View>

          <Image 
            source={{ uri: mainImage }} 
            className="w-64 h-64 self-center z-10"
            style={styles.pokemonImage}
          />
        </View>

        {/* Content Card Overlay */}
        <View style={styles.contentContainer}>
          {/* Stats Grid */}
          <View className="flex-row justify-around py-4 mb-4">
            <View className="items-center">
              <Text className="text-gray-400 text-xs mb-1">WEIGHT</Text>
              <Text className="font-bold text-base">{formatWeight(pokemon.weight)}</Text>
            </View>
            <View className="w-[1] h-10 bg-gray-100" />
            <View className="items-center">
              <Text className="text-gray-400 text-xs mb-1">HEIGHT</Text>
              <Text className="font-bold text-base">{formatHeight(pokemon.height)}</Text>
            </View>
          </View>

          {/* Base Stats Section */}
          <Text className="text-xl font-bold mb-4 px-2">Base Stats</Text>
          {pokemon.stats.map((stat) => (
            <View key={stat.stat.name} className="flex-row items-center mb-3 px-2">
              <Text className="w-24 text-gray-500 font-medium uppercase text-[10px]">
                {stat.stat.name.replace("special-", "Sp. ")}
              </Text>
              <Text className="w-8 font-bold text-gray-800 mr-2">{stat.base_stat}</Text>
              <View className="flex-1">
                <ProgressBar 
                  progress={stat.base_stat / 255} 
                  color={getStatColor(stat.base_stat)} 
                  style={{ borderRadius: 10, height: 6 }}
                />
              </View>
            </View>
          ))}

          {/* Moves Chip Layout */}
          <Text className="text-xl font-bold mt-8 mb-4 px-2">Key Moves</Text>
          <View className="flex-row flex-wrap gap-2 px-2 pb-10">
            {pokemon.moves.slice(0, 10).map((m) => (
              <View key={m.move.name} className="bg-gray-100 px-3 py-2 rounded-lg">
                <Text className="text-gray-600 text-sm font-medium">{capitalize(m.move.name)}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 320,
    paddingTop: 20,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  pokemonImage: {
    position: 'absolute',
    bottom: -40,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 60, // Space for the overlapping image
  }
});