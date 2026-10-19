import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import OrdersItems from "../../components/OrdersComponents/ordersItems";
import AddOrderModal from "../../components/OrdersComponents/AddOrderModal";
import useOrder from "../../hooks/useOrder";
const filters = [
  { label: "All", value: "All" },
  { label: "Pending", value: "pending" },
  { label: "Closed", value: "closed" },
];

const OrdersScreen = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const {fetchOrders} = useOrder()

  return (
    <View className="flex-1 bg-[#F7FBF8]">
      <View className="bg-[#F7FBF8] px-3 pt-3 pb-2">
        <View className="mt-3 flex-row items-center rounded-[50px] bg-[#FFFDF9] border border-[#E6EFE7] px-4 py-3">
          <Ionicons name="search-outline" size={18} color="#6B8A84" />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search order number or customer..."
            placeholderTextColor="#9CA3AF"
            className="ml-2 flex-1 text-[14px] text-[#1F5A4B]"
          />
        </View>

        <View className="mt-2 flex-row items-center gap-2 p-2">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.value;

            return (
              <Pressable
                key={filter.value}
                onPress={() => setActiveFilter(filter.value)}
                className={`flex-1 rounded-[10px] px-2 py-1.5 ${
                  isActive ? "bg-[#1F5A4B]" : "bg-white"
                }`}
              >
                <Text
                  className={`text-center text-[11px] font-semibold ${
                    isActive ? "text-white" : "text-[#6B8A84]"
                  }`}
                >
                  {filter.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View className="mt-2 flex-row items-center justify-between px-1">
          <Text className="text-[14px] font-semibold text-[#1F5A4B]">
            Recent orders
          </Text>
          <Pressable className="flex-row items-center">
            <Text className="text-[12px] text-[#6B8A84]">Newest first</Text>
            <Ionicons
              name="filter-outline"
              size={14}
              color="#6B8A84"
              style={{ marginLeft: 4 }}
            />
          </Pressable>
        </View>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-3 pb-24 gap-3 pt-2"
        showsVerticalScrollIndicator={false}
      >
        <OrdersItems filteredStatus={activeFilter} searchQuery={search} />
      </ScrollView>

      <Pressable
        onPress={() => setShowAddModal(true)}
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

      <AddOrderModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        refetch={fetchOrders}
      />
    </View>
  );
};

export default OrdersScreen;
