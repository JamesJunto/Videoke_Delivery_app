import { Ionicons } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";
import { Pressable, Text, View } from "react-native";

const BottomNavigation = () => {
  const pathname = usePathname();

  return (
    <View className="flex-row border-t border-[#E6EFE7] bg-[#F7FBF8] py-2">
      <Pressable
        className="flex-1 items-center justify-center px-1"
        onPress={() => router.push("/screens/DashboardScreen")}
      >
        <Ionicons
          name="grid-outline"
          size={20}
          color={pathname === "/screens/DashboardScreen" ? "#1F5A4B" : "#000000"}
        />
        <Text
          numberOfLines={1}
          className={`mt-0.5 text-[11px] font-medium ${
            pathname === "/screens/DashboardScreen"
              ? "text-[#1F5A4B]"
              : "text-black"
          }`}
        >
          Overview
        </Text>
      </Pressable>

      <Pressable
        className="flex-1 items-center justify-center px-1"
        onPress={() => router.push("/screens/InventoryScreen")}
      >
        <Ionicons
          name="cube-outline"
          size={20}
          color={pathname === "/screens/InventoryScreen" ? "#1F5A4B" : "#000000"}
        />
        <Text
          numberOfLines={1}
          className={`mt-0.5 text-[11px] font-medium ${
            pathname === "/screens/InventoryScreen"
              ? "text-[#1F5A4B]"
              : "text-black"
          }`}
        >
          Packages
        </Text>
      </Pressable>

      <Pressable
        className="flex-1 items-center justify-center px-1"
        onPress={() => router.push("/screens/OrdersScreen")}
      >
        <Ionicons
          name="receipt-outline"
          size={20}
          color={pathname === "/screens/OrdersScreen" ? "#1F5A4B" : "#000000"}
        />
        <Text
          numberOfLines={1}
          className={`mt-0.5 text-[11px] font-medium ${
            pathname === "/screens/OrdersScreen"
              ? "text-[#1F5A4B]"
              : "text-black"
          }`}
        >
          Orders
        </Text>
      </Pressable>


    </View>
  );
};

export default BottomNavigation;
