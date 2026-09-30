import { Slot } from "expo-router";
import { View } from "react-native";

import BottomNavigation from "../components/BottomNavigation";
import Header from "../components/Header";

export default function Layout() {
  return (
    <View className="flex-1 bg-gray-50">
      <Header />

      <View className="flex-1 ">
        <Slot />
      </View>

      <BottomNavigation />
    </View>
  );
}
