import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Easing } from "react-native";
import { ActivityIndicator } from "react-native-paper";

interface LoadingSpinnerProps {
  message?: string;
  transparent?: boolean;
}

export default function LoadingSpinner({
  message = "Gotta catch 'em all...",
  transparent = false,
}: LoadingSpinnerProps) {
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
   
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

   
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View 
      style={{ opacity: fadeAnim }}
      className={`flex-1 items-center justify-center ${transparent ? 'bg-transparent' : 'bg-gray-50'}`}
    >
      <View className="items-center">
        {/* Custom Loader: A Pokeball-inspired rotation */}
        <Animated.View style={{ transform: [{ rotate: spin }] }} className="mb-6">
           <View className="w-16 h-16 rounded-full border-4 border-blue-500 border-t-red-500 items-center justify-center">
              <View className="w-4 h-4 rounded-full bg-blue-600" />
           </View>
        </Animated.View>

        {message && (
          <View>
            <Text className="text-gray-400 text-sm font-bold uppercase tracking-widest text-center">
              {message}
            </Text>
            {/* Subtle Progress Bar Indication */}
            <ActivityIndicator 
              animating={true} 
              color="#3b82f6" 
              size="small" 
              style={{ marginTop: 12 }} 
            />
          </View>
        )}
      </View>
    </Animated.View>
  );
}