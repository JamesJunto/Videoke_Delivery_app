import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import InventoryItems from "../../components/InventoryComponents/InventoryItems";
import AddProductModal from "../../components/InventoryComponents/AddProductModal";
import useInventory from "../../hooks/useInventory";
const InventoryScreen = () => {
  const { fetchInventory } = useInventory()
  const [formVisible, setFormVisible] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <View className="flex-1 bg-[#F7FBF8]">
      <View className="bg-[#F7FBF8] px-3 pt-3 pb-2">
        <View className="flex-row items-center rounded-[10px] bg-[#FFFDF9] border border-[#E6EFE7] px-4 py-3">
          <Ionicons name="search-outline" size={18} color="#6B8A84" />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search inventory..."
            placeholderTextColor="#9CA3AF"
            className="ml-2 flex-1 text-[14px] text-[#1F5A4B]"
          />
        </View>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-3 pb-24 gap-2 pt-2"
        showsVerticalScrollIndicator={false}
      >
        <InventoryItems searchQuery={search} />
      </ScrollView>

      {formVisible && (
        <AddProductModal
          visible={formVisible}
          refetch={fetchInventory}
          onClose={() => setFormVisible(false)}
        />
      )}

      <Pressable
        onPress={() => setFormVisible(true)}
        className="absolute bottom-6 right-5 h-14 w-14 items-center justify-center rounded-full bg-[#1F5A4B]"
        style={{
          shadowColor: "#1F5A4B",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 6,
        }}
      >
        <Ionicons name="add" size={28} color="#FFFDF9" />
      </Pressable>
    </View>
  );
};

export default InventoryScreen;
