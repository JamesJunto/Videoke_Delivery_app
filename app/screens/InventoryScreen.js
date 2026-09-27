import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import InventoryItems from "../../components/InventoryComponents/InventoryItems";
const filters = [
  { label: "All", value: "All" },
  { label: "Available", value: "Available" },
  { label: "Out of Stock", value: "Out of Stock" },
  { label: "Sold", value: "Sold" },
];

const InventoryScreen = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <View className="flex-1">
      <View className="absolute left-0 right-0 top-0 z-10 h-9 border-b border-gray-300 bg-white px-3 pt-2">
        <View className="flex-row items-center justify-between gap-1">
          {filters.map((filter) => (
            <Pressable
              key={filter.value}
              onPress={() => setActiveFilter(filter.value)}
              className={`rounded-[10px] px-3 py-1 ${
                activeFilter === filter.value ? "bg-[#C1272D]" : "bg-gray-200"
              }`}
            >
              <Text
                className={`text-[14px] font-semibold ${
                  activeFilter === filter.value ? "text-white" : "text-gray-900"
                }`}
              >
                {filter.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <ScrollView
        className="flex-1 justify-between "
        contentContainerClassName="px-3 pb-4 gap-2  pt-12"
      >
        <Text className="mb-1 text-xl font-bold text-gray-900">Inventory</Text>
        <InventoryItems filteredStatus={activeFilter} />
      </ScrollView>
    </View>
  );
};

export default InventoryScreen;
