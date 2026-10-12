import { Slot } from "expo-router";
import { View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { usePathname } from "expo-router";
import { useEffect } from "react";
import BottomNavigation from "../components/BottomNavigation";
import Header from "../components/Header";

export default function Layout() {
  const pathname = usePathname();

  const isValidScreen = pathname === "/screens/LoginScreen" || "/screens/RegisterScreen";


  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-gray-50">
        {!isValidScreen && <Header />}

        <View className="flex-1 ">
          <Slot />
        </View>

        {!isValidScreen && <BottomNavigation />}
    </SafeAreaView>
    </SafeAreaProvider>
  );
}
