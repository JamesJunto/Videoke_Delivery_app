import { Ionicons } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";
import { Pressable, Text, View } from "react-native";

const BottomNavigation = () => {
  const pathname = usePathname();

  return (
    <View className="flex-row border-t border-gray-200 bg-white py-2">
      <Pressable
        className="flex-1 items-center justify-center"
        onPress={() => router.push("/screens/DashboardScreen")}
      >
        <Ionicons
          name="grid-outline"
          size={21}
          color={
            pathname === "/screens/DashboardScreen" ? "#B22222" : "#000000"
          }
        />
        <Text
          className={`mt-0.5 text-[11px] font-medium ${
            pathname === "/screens/DashboardScreen"
              ? "text-[#B22222]"
              : "text-black-500"
          }`}
        >
          Dashboard
        </Text>
      </Pressable>

      <Pressable
        className="flex-1 items-center justify-center"
        onPress={() => router.push("/screens/customers")}
      >
        <Ionicons
          name="people-outline"
          size={21}
          color={pathname === "/screens/customers" ? "#B22222" : "#000000"}
        />
        <Text
          className={`mt-0.5 text-[11px] font-medium ${
            pathname === "/screens/customers"
              ? "text-[#B22222]"
              : "text-black-500"
          }`}
        >
          Customers
        </Text>
      </Pressable>

      <Pressable
        className="flex-1 items-center justify-center"
        onPress={() => router.push("/screens/inventory")}
      >
        <Ionicons
          name="cube-outline"
          size={21}
          color={pathname === "/screens/inventory" ? "#B22222" : "#000000"}
        />
        <Text
          className={`mt-0.5 text-[11px] font-medium ${
            pathname === "/screens/inventory"
              ? "text-[#B22222]"
              : "text-black-500"
          }`}
        >
          Inventory
        </Text>
      </Pressable>

      <Pressable
        className="flex-1 items-center justify-center"
        onPress={() => router.push("/screens/deliveries")}
      >
        <Ionicons
          name="bicycle-outline"
          size={21}
          color={pathname === "/screens/deliveries" ? "#B22222" : "#000000"}
        />
        <Text
          className={`mt-0.5 text-[11px] font-medium ${
            pathname === "/screens/deliveries"
              ? "text-[#B22222]"
              : "text-black-500"
          }`}
        >
          Deliveries
        </Text>
      </Pressable>
    </View>
  );
};

export default BottomNavigation;
