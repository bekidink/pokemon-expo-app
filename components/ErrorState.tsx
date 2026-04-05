import React, { useState } from "react";
import { View, Text,  } from "react-native";
import { Button } from "react-native-paper";
import { AlertCircle, WifiOff, RefreshCw } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void | Promise<unknown>;
  error?: any;
}

export default function ErrorState({
  message = "Something went wrong",
  onRetry,
  error,
}: ErrorStateProps) {
  const [isRetrying, setIsRetrying] = useState(false);

  // Identify common error types for better UX
  const isNetworkError = 
    error?.message?.toLowerCase().includes("network") || 
    error?.message?.toLowerCase().includes("fetch");

  const handleRetry = async () => {
    if (!onRetry) return;
    setIsRetrying(true);
    try {
      await onRetry();
    } finally {
      // Small delay so the user sees the loading state finish
      setTimeout(() => setIsRetrying(false), 500);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center p-8">
      <View className="items-center max-w-sm">
        {/* Dynamic Icon based on error type */}
        <View 
          className={`w-20 h-20 rounded-3xl items-center justify-center mb-8 shadow-sm 
          ${isNetworkError ? 'bg-orange-100' : 'bg-red-100'}`}
        >
          {isNetworkError ? (
            <WifiOff size={40} color="#f97316" />
          ) : (
            <AlertCircle size={40} color="#ef4444" />
          )}
        </View>

        <Text className="text-2xl font-black text-gray-900 text-center tracking-tight">
          {isNetworkError ? "Connection Lost" : "Entry Failed"}
        </Text>

        <Text className="text-gray-500 text-center mt-3 text-base leading-6">
          {isNetworkError 
            ? "We couldn't connect to the server. Please check your internet connection and try again."
            : error?.message || message}
        </Text>

        {/* Action Section */}
        {onRetry && (
          <View className="w-full mt-10">
            <Button
              mode="contained"
              loading={isRetrying}
              disabled={isRetrying}
              onPress={handleRetry}
              className="rounded-xl py-1"
              contentStyle={{ height: 50 }}
              buttonColor="#3b82f6"
              icon={({ color }) => !isRetrying && <RefreshCw size={18} color={color} />}
            >
              {isRetrying ? "Retrying..." : "Try Again"}
            </Button>
            
            {isNetworkError && (
              <Text className="text-gray-400 text-xs text-center mt-4">
                Verify your Wi-Fi or cellular data settings
              </Text>
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}