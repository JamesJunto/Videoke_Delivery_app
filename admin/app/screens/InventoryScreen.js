import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import InventoryItems from "../../components/InventoryComponents/InventoryItems";
import AddProductModal from "../../components/InventoryComponents/AddProductModal";

const filters = [
  { label: "All", value: "All" },
  { label: "Available", value: "available" },
  { label: "Unavailable", value: "out of stock" },
];

const InventoryScreen = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [formVisible, setFormVisible] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <View className="flex-1 ]">

      <View className="bg-[#F7FBF8] px-3 pt-3 pb-2">

        <View className="flex-row items-center rounded-[10px] bg-[#FFFDF9] border border-[#E6EFE7] px-4 py-3">
          <Ionicons name="search-outline" size={18} color="#6B8A84" />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search inventory..."
            placeholderTextColor="#9CA3AF"
            className="ml-2 flex-1 text-[14px] text-gray-900"
          />
        </View>

        <View className="mt-2 flex-row items-center gap-2 bg-[#F7FBF8] p-2">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.value;

            return (
              <Pressable
                key={filter.value}
                onPress={() => setActiveFilter(filter.value)}
                className={`flex-1 rounded-[10px] px-3 py-1.5 ${
                  isActive ? "bg-[#1F5A4B]" : "bg-white"
                }`}
              >
                <Text
                  className={`text-center text-[12px] font-semibold ${
                    isActive ? "text-white" : "text-[#6B8A84]"
                  }`}
                >
                  {filter.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-3 pb-24 gap-2 pt-2"
      >
        <InventoryItems filteredStatus={activeFilter} searchQuery={search} />
      </ScrollView>

      {formVisible && (
        <AddProductModal
          visible={formVisible}
          onClose={() => setFormVisible(false)}
        />
      )}

      <View className="absolute bottom-4 right-5 z-10">
        <Pressable
          onPress={() => setFormVisible(true)}
          className="flex-row items-center rounded-[12px] bg-[#C1272D] px-4 py-2.5 active:opacity-80"
        >
          <Text className="mr-2 text-[24px] font-bold leading-[26px] text-white">
            +
          </Text>
          <Text className="text-[16px] font-semibold text-white">
            Add Inventory
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default InventoryScreen;
