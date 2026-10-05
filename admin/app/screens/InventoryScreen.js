import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import InventoryItems from "../../components/InventoryComponents/InventoryItems";
import AddProductModal from "../../components/InventoryComponents/AddProductModal";

const filters = [
  { label: "All", value: "All" },
  { label: "Available", value: "available" },
  { label: "Out of Stock", value: "out of stock" },
];

const InventoryScreen = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [formVisible, setFormVisible] = useState(false);

  return (
    <View className="flex-1">
      <View className="absolute left-0 right-0 top-0 z-10 h-9 border-b border-gray-300 bg-white px-3 pt-2">
        <View className="flex-row items-center justify-center gap-5">
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
        className="flex-1"
        contentContainerClassName="px-3 pb-24 gap-2 pt-12"
      >
        <Text className="mb-1 text-xl font-bold text-gray-900">Inventory</Text>
        <InventoryItems filteredStatus={activeFilter} />
      </ScrollView>

      {formVisible && (
        <AddProductModal
          visible={formVisible}
          onClose={() => setFormVisible(false)}
        />
      )}

      <View className="absolute bottom-4 right-5">
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
