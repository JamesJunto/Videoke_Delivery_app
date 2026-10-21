import { Ionicons } from "@expo/vector-icons";
import { usePathname, router } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { SCREENS, DEFAULT_SCREEN } from "./screens";

const Header = () => {
  const pathname = usePathname();
  const [showModal, setShowModal] = useState(false);

  const { title, subtitle } = SCREENS[pathname] ?? DEFAULT_SCREEN;

  const handleLogout = () => {
    setShowModal(false);


    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log Out",
        style: "destructive",
        onPress: () => router.replace("/screens/LoginScreen"),
      },
    ]);
  };

  return (
    <View className="h-16 flex-row items-center justify-between px-4 z-50">
      <View>
        <Text className="text-[26px] font-bold text-[#1F5A4B] tracking-wide">
          {title}
        </Text>
        <Text className="text-[12px] text-[#1F5A4B]">
          {subtitle}
        </Text>
      </View>

      <Pressable
        className="items-center justify-center p-2 rounded-full bg-[#E6EFE7] active:opacity-60"
        onPress={() => setShowModal(!showModal)}
      >
        <Ionicons name="person-outline" size={24} color="#1F5A4B" />
      </Pressable>

      {showModal && (
        <>
          <Pressable
            className="absolute inset-0 -z-10"
            onPress={() => setShowModal(false)}
          />

          <View className="absolute top-14 right-4 w-40 rounded-xl border border-[#E6EFE7] bg-[#FFFDF9] shadow-md z-50">
            <Pressable
              onPress={handleLogout}
              className="flex-row items-center gap-3 p-3 active:opacity-60"
            >
              <Ionicons name="log-out-outline" size={20} color="#E53935" />
              <Text className="text-[14px] font-semibold text-[#E53935]">
                Log Out
              </Text>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
};

export default Header;
