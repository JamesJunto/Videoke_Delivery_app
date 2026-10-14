import { Ionicons } from "@expo/vector-icons";
import { usePathname } from "expo-router";
import { Pressable, Text, View } from "react-native";

const Header = () => {
  const pathname = usePathname();

  const SCREENS = {
    "/screens/DashboardScreen": {
      title: "Dashboard",
      subtitle: "Videoke Delivery · Admin workspace",
    },
    "/screens/OrdersScreen": {
      title: "Orders",
      subtitle: "Manage customer orders",
    },
    "/screens/InventoryScreen": {
      title: "Packages",
      subtitle: "Available videoke sets",
    },
    "/screens/DeliveriesScreen": {
      title: "Deliveries",
      subtitle: "Track ongoing deliveries",
    },
    "/screens/CustomersScreen": {
      title: "Customers",
      subtitle: "Customer list & history",
    },
    "/screens/ReportsScreen": {
      title: "Reports",
      subtitle: "Sales & activity reports",
    },
  };

  const DEFAULT_SCREEN = {
    title: "Dashboard",
    subtitle: "Videoke Delivery · Admin workspace",
  };

  const { title, subtitle } = SCREENS[pathname] ?? DEFAULT_SCREEN;

  return (
    <View className="h-16 flex-row items-center justify-between px-4">
      <View>
        <Text className="text-[26px] font-bold text-[#1F5A4B] tracking-wide">
          {title}
        </Text>
        <Text className="text-[12px] text-[#1F5A4B]">
          {subtitle}
        </Text>
      </View>

      <Pressable
        className="items-center justify-center p-2 rounded-full active:bg-white/10"
        onPress={() => alert("Notifications pressed")}
      >
        <Ionicons name="notifications-outline" size={26} color="#FFF5F5" />
      </Pressable>
    </View>
  );
};

export default Header;
