import { Slot } from "expo-router";
import { View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import connectWebSocket from "../services/websocketService";
import BottomNavigation from "../components/BottomNavigation";
import Header from "../components/Header";
import { CartProvider } from "../context/cartContext";
import { usePathname } from "expo-router";

export default function Layout() {
  const pathname = usePathname();

  const isLoginScreen = pathname === "/screens/LoginScreen";

  useEffect(() => {
    connectWebSocket();
  }, []);

  return (
    <CartProvider>
      <SafeAreaProvider>
        <SafeAreaView className="flex-1 bg-gray-50">
          {!isLoginScreen && <Header />}

          <View className="flex-1 ">
            <Slot />
          </View>

          {!isLoginScreen && <BottomNavigation />}
        </SafeAreaView>
      </SafeAreaProvider>
    </CartProvider>
  );
}
