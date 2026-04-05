import { View, FlatList, Text,  Keyboard } from "react-native";
import { useState, useMemo } from "react";
import { usePokemonList } from "@/hooks/usePokemonList";
import PokemonCard from "@/components/PokemonCard";
import { Searchbar } from "react-native-paper";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorState from "@/components/ErrorState";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const { data, isLoading, error, refetch, isRefetching } = usePokemonList();
  const [search, setSearch] = useState("");

  
  const filtered = useMemo(() => {
    if (!data) return [];
    if (!search) return data;
    const term = search.toLowerCase();
    return data.filter((p) => p.name.toLowerCase().includes(term));
  }, [data, search]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorState onRetry={refetch} />;

  return (
    <SafeAreaView className="flex-1 bg-blue-600">
      <View className="pt-4 pb-4 px-4">
        <View className="flex-row items-center mb-4">
          <Text className="text-white text-3xl font-black tracking-tight">Poké</Text>
          <Text className="text-yellow-400 text-3xl font-black tracking-tight">dex</Text>
        </View>
        
        <Searchbar
          placeholder="Search by name..."
          onChangeText={setSearch}
          value={search}
          elevation={2}
          onClearIconPress={() => Keyboard.dismiss()}
          className="bg-white rounded-xl"
        />
      </View>

      <View className="flex-1 bg-gray-50 rounded-t-[32px] overflow-hidden">
        <FlatList
          data={filtered}
          numColumns={2}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => <PokemonCard pokemon={item} />}
          contentContainerStyle={{ padding: 12, paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          // Pull to refresh
          onRefresh={refetch}
          refreshing={isRefetching}
          // Empty state handler
          ListEmptyComponent={() => (
            <View className="items-center justify-center mt-20">
              <Text className="text-gray-400 text-lg">No Pokémon matches your search</Text>
            </View>
          )}
          // Performance props
          removeClippedSubviews={true}
          maxToRenderPerBatch={10}
          windowSize={5}
        />
      </View>
    </SafeAreaView>
  );
}