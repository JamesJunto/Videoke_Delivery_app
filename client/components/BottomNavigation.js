import { Ionicons } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";
import { Pressable, Text, View } from "react-native";

const BottomNavigation = () => {
  const pathname = usePathname();

  return (
    <View className="flex-row border-t border-gray-200 bg-white py-2">

      <Pressable
        className="flex-1 items-center justify-center"
        onPress={() => router.push("/screens/HomeScreen")}
      >
        <Ionicons
          name="home-outline"
          size={22}
          color={
            pathname === "/screens/HomeScreen" ? "#B22222" : "#000000"
          }
        />
        <Text
          className={`mt-0.5 text-[14px] font-medium ${
            pathname === "/screens/HomeScreen"
              ? "text-[#B22222]"
              : "text-gray-500"
          }`}
        >
          Home
        </Text>
      </Pressable>

      <Pressable
        className="flex-1 items-center justify-center"
        onPress={() => router.push("/screens/OrdersScreen")}
      >
        <Ionicons
          name="receipt-outline"
          size={22}
          color={
            pathname === "/screens/OrdersScreen" ? "#B22222" : "#000000"
          }
        />
        <Text
          className={`mt-0.5 text-[14px] font-medium ${
            pathname === "/screens/OrdersScreen"
              ? "text-[#B22222]"
              : "text-gray-500"
          }`}
        >
          Orders
        </Text>
      </Pressable>

      {/* Notifications */}
      <Pressable
        className="flex-1 items-center justify-center"
        onPress={() => router.push("/screens/NotificationScreen")}
      >
        <Ionicons
          name="notifications-outline"
          size={22}
          color={
            pathname === "/screens/NotificationScreen"
              ? "#B22222"
              : "#000000"
          }
        />
        <Text
          className={`mt-0.5 text-[14px] font-medium ${
            pathname === "/screens/NotificationsScreen"
              ? "text-[#B22222]"
              : "text-gray-500"
          }`}
        >
          Notifications
        </Text>
      </Pressable>

      {/* Profile */}
      <Pressable
        className="flex-1 items-center justify-center"
        onPress={() => router.push("/screens/ProfileScreen")}
      >
        <Ionicons
          name="person-outline"
          size={22}
          color={
            pathname === "/screens/ProfileScreen" ? "#B22222" : "#000000"
          }
        />
        <Text
          className={`mt-0.5 text-[14px] font-medium ${
            pathname === "/screens/ProfileScreen"
              ? "text-[#B22222]"
              : "text-gray-500"
          }`}
        >
          Profile
        </Text>
      </Pressable>

    </View>
  );
};

export default BottomNavigation;
