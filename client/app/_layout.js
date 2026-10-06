import { Slot } from "expo-router";
import { View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import connectWebSocket from "../services/websocketService";
import BottomNavigation from "../components/BottomNavigation";
import Header from "../components/Header";
import { CartProvider } from "../context/cartContext";

export default function Layout() {
  useEffect(() => {
    connectWebSocket();
  }, []);

  return (
    <CartProvider>
      <SafeAreaProvider>
        <SafeAreaView className="flex-1 bg-gray-50">
          <Header />

          <View className="flex-1 ">
            <Slot />
          </View>

          <BottomNavigation />
        </SafeAreaView>
      </SafeAreaProvider>
    </CartProvider>
  );
}
