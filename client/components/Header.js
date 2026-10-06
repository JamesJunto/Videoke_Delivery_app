import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { useState } from "react";
import CartModal from "./CartModal";
const Header = () => {
  const [openModal, setOpenModal] = useState(false)
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

      <View className="flex-row items-center gap-3">
        <Pressable
          className="h-10 w-10 items-center justify-center rounded-full bg-gray-100"
          onPress={() => setOpenModal(true) }
        >
          <Ionicons
            name="cart-outline"
            size={22}
            color="#B22222"
          />
        </Pressable>

        {openModal &&
          <CartModal
            visible={openModal}
            onClose={() => setOpenModal(false)}
          />
        }

        <Pressable
          className="h-10 w-10 items-center justify-center rounded-full bg-[#B22222]"
          onPress={() => console.log("press")}
        >
          <Ionicons
            name="person-outline"
            size={22}
            color="#ffffff"
          />
        </Pressable>
      </View>
    </View>
  );
};

export default Header;
