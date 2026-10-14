import { Text, View, Pressable } from "react-native";

const PendingOrders = () => {
  const PendingOrders = [
    {
      id: 1,
      customer: "Juan Dela Cruz",
      item: "Videoke Set",
      address: "Davao City",
      value: "₱1,500",
      date: "Sep 26, 2026",
    },
    {
      id: 2,
      customer: "Maria Santos",
      item: "Sound System",
      address: "Bajada, Davao City",
      value: "₱2,200",
      date: "Sep 26, 2026",
    },
  ];

  return (
    <View className="w-full rounded-[8px] bg-[#FFFDF9] border border-[#E6EFE7] overflow-hidden">
      {PendingOrders.map((orders, index) => {
        return (
          <View key={orders.id}>
            {index !== 0 && <View className="h-[1px] bg-gray-200 mx-4" />}

            <View className="p-4 flex-row justify-between items-center">
              <View className="flex-1 pr-2">
                <Text className="text-[18px] font-semibold text-[#1F5A4B]">
                  {orders.customer}
                </Text>

                <Text className="mt-1 text-[14px] text-[#6B8A84]">
                  {orders.address} - {orders.date}
                </Text>

                <Pressable
                  className="flex-row items-center active:opacity-60 mt-2"
                  onPress={() => router.push("/screens/OrdersScreen")}
                >
                  <Text className="text-[13px] font-medium text-[#1F5A4B]">
                    Review Order
                  </Text>
                  <Text className="ml-1 text-[13px] font-medium text-[#1F5A4B]">
                    →
                  </Text>
                </Pressable>
              </View>

              <View className="items-end">
                <Text className="text-[18px] font-bold text-[#1F5A4B]">
                  {orders.value}
                </Text>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};
export default PendingOrders;
