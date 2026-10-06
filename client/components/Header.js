import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

const Header = () => {
  const name = "Oskar";

  return (
    <View
      className="h-16 flex-row items-center justify-between bg-white px-4 shadow-sm"
      style={{
        zIndex: 999,
        elevation: 10,
      }}
    >

      <View>
        <Text className="text-sm text-gray-500">
          Welcome back,
        </Text>

        <Text className="text-lg font-bold text-gray-900">
          {name}
        </Text>
      </View>

      <Pressable
        className="h-10 w-10 items-center justify-center rounded-full bg-[#B22222]"
        onPress={() => alert("Profile pressed")}
      >
        <Ionicons name="person-outline" size={22} color="#ffffff" />
      </Pressable>

    </View>
  );
};

export default Header;
