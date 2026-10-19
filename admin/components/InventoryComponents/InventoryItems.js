import {
  Alert,
  Text,
  View,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import useInventory from "../../hooks/useInventory";
import ItemsEditModal from "./itemsEditModal";

const InventoryItems = ({ searchQuery = "" }) => {
  const { items, loading, error, fetchInventory, handleDeleteInventory } = useInventory();

  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const DeleteItem = async (item) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${item.product_name}"? This action cannot be undone.`
    );

    /*
    // if mobile gamit ni Alert.alert():
    Alert.alert(
      "Delete Package",
      `Are you sure you want to delete "${item.product_name}"? This action cannot be undone.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            //try {
              await handleDelete(item.product_id)
              await fetchInventory();
            } catch (error) {
              window.alert("Failed to delete package.");
            }
          },
        },
      ]
    );
    */

    if (!confirmed) return;

    try {
      await  handleDeleteInventory(item.product_id)
      await fetchInventory();
    } catch (error) {
      window.alert("Failed to delete package.");
    }
  };

  const filteredItems = items.filter((item) => {
    const searchMatch =
      searchQuery.trim() === "" ||
      item.product_name
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());

    return searchMatch;
  });

  if (loading) {
    return (
      <View className="items-center justify-center py-12">
        <ActivityIndicator size="large" color="#1F5A4B" />

        <Text className="mt-3 text-[14px] text-[#6B8A84]">
          Loading inventory...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="items-center justify-center py-12">
        <Text className="text-[16px] font-bold text-[#A33A3A]">
          Failed to load inventory
        </Text>

        <Text className="mt-2 text-center text-[13px] text-[#6B8A84]">
          {String(error)}
        </Text>
      </View>
    );
  }

  if (filteredItems.length === 0) {
    const hasSearch = searchQuery.trim() !== "";

    return (
      <View className="items-center justify-center py-12">
        <Text className="text-[16px] font-bold text-[#1F5A4B]">
          {hasSearch ? "No packages found" : "No inventory items yet"}
        </Text>

        <Text className="mt-2 text-center text-[13px] text-[#6B8A84]">
          {hasSearch
            ? "Try searching with a different package name."
            : "Your packages will appear here once they are added."}
        </Text>
      </View>
    );
  }

  return (
    <>
      {filteredItems.map((item) => {
        const isAvailable = item.status === "available";
        const totalStocks = item.stock;
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

              <View className="flex-row items-center gap-2">
                <Pressable
                  onPress={() => {
                    setSelectedItem(item);
                    setModalVisible(true);
                  }}
                  className="rounded-[10px] bg-[#E6EFE7] px-3 py-2 active:opacity-70"
                >
                  <Text className="text-[13px] font-semibold text-[#1F5A4B]">
                    Edit package
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() => DeleteItem(item)}
                  hitSlop={8}
                  className="rounded-[10px] border border-[#F0D6D6] bg-red-50 px-3 py-2 active:opacity-70"
                >
                  <Text className="text-[13px] font-semibold text-[#A33A3A]">
                    Delete
                  </Text>
                </Pressable>
              </View>
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
          fetchInventory();
        }}
      />
    </>
  );
};

export default InventoryItems;
