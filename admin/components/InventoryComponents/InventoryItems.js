import { Text, View, Pressable } from "react-native";
import useInventory from "../../hooks/useInventory";
import { useState } from "react";
import ItemsEditModal from "./itemsEditModal";

const InventoryItems = ({ searchQuery = "" }) => {
  const { items, loading, error,} = useInventory();
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const filteredItems = items.filter((item) => {
    const searchMatch =
      searchQuery.trim() === "" ||
      item.product_name.toLowerCase().includes(searchQuery.toLowerCase());
    return  searchMatch;
  });

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <>
      {filteredItems.map((item) => {
        const isAvailable = item.status === "available";
        const totalStocks = item.quantity;
        const availableStocks = item.available_sets ?? item.quantity;

        return (
          <View
            key={item.product_id}
            className="rounded-[12px] border border-[#E6EFE7] bg-[#FFFDF9] p-4"
          >
            <View className="flex-row items-center justify-between">
              <View
                className={`rounded-full px-3 py-1 ${
                  isAvailable ? "bg-[#D9EFE3]" : "bg-[#F3D9D9]"
                }`}
              >
                <Text
                  className={`text-[12px] font-semibold ${
                    isAvailable ? "text-[#1F5A4B]" : "text-[#A33A3A]"
                  }`}
                >
                  {isAvailable ? "Available" : "Unavailable"}
                </Text>
              </View>

              <Text className="text-[12px] text-[#6B8A84]">
                {totalStocks} in stock
              </Text>
            </View>

            <Text className="mt-3 text-[18px] font-bold text-[#1F5A4B]">
              {item.product_name}
            </Text>

            <Text
              numberOfLines={2}
              className="mt-1 text-[13px] leading-[18px] text-[#6B8A84]"
            >
              {item.description ??
                'Karaoke player, 2 wireless mics, 2 speakers, 43" TV & stands'}
            </Text>

            <View className="mt-3 flex-row items-center justify-between">
              <Text className="text-[13px] text-[#6B8A84]">
                {isAvailable ? "Available now" : "Not available"}
              </Text>

              <Text className="text-[13px] font-semibold text-[#1F5A4B]">
                {availableStocks} of {totalStocks} in stock
              </Text>
            </View>

            <View className="my-3 h-[1px] bg-[#E6EFE7]" />

            <View className="flex-row items-center justify-between">
              <View className="flex-row items-end">
                <Text className="text-[22px] font-bold text-[#1F5A4B]">
                  ₱{item.price}
                </Text>
                <Text className="ml-1 mb-0.5 text-[13px] text-[#6B8A84]">
                  / unit
                </Text>
              </View>

              <Pressable
                onPress={() => {
                  setSelectedItem(item);
                  setModalVisible(true);
                }}
                className="rounded-[10px] bg-[#E6EFE7] px-4 py-2 active:opacity-70"
              >
                <Text className="text-[13px] font-semibold text-[#1F5A4B]">
                  Edit package
                </Text>
              </Pressable>
            </View>
          </View>
        );
      })}

      <ItemsEditModal
        visible={modalVisible}
        item={selectedItem}
        onClose={() => {
          setModalVisible(false);
          setSelectedItem(null);
        }}
      />
    </>
  );
};

export default InventoryItems;
