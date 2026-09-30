import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

const Header = () => {
  return (
    <View className="h-12 flex-row items-center justify-between bg-[#C1272D] px-4 shadow-md">
      <Text className="text-[22px] font-bold text-white tracking-wide">
        Cabway Videoke
      </Text>

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
