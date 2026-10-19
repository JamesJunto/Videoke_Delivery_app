import React from "react";
import { Text, View } from "react-native";

const MostFrequentCustomer = ({ orders = [], date }) => {
  const deliveredOrders = orders.filter((order) => {
    if (!order.delivery_schedule) return false;

    const scheduleDate = new Date(
      order.delivery_schedule
    ).toLocaleDateString("en-CA");

    return (
      scheduleDate === date &&
      order.status === "delivered"
    );
  });

  const customerMap = deliveredOrders.reduce((acc, order) => {
    const customerName = order.name || "Unknown Customer";

    if (!acc[customerName]) {
      acc[customerName] = {
        name: customerName,
        orders: 0,
        totalSpent: 0,
      };
    }

    acc[customerName].orders += 1;
    acc[customerName].totalSpent += Number(order.total) || 0;

    return acc;
  }, {});

  const sortedCustomers = Object.values(customerMap)
    .sort((a, b) => b.totalSpent - a.totalSpent)
    .map((customer, index) => ({
      ...customer,
      id: index.toString(),
      formattedTotal: `₱${customer.totalSpent.toLocaleString()}`,
    }));

  return (
    <View className="mb-6">
      <Text className="text-[#1F5A4B] font-bold text-lg mb-3">
        Most Frequent Customers
      </Text>

      <View className="bg-[#FFFDF9] rounded-xl border border-[#E6EFE7]">
        {sortedCustomers.length === 0 ? (
          <View className="p-4 items-center justify-center">
            <Text className="text-[#6B8F82] text-sm">
              No delivered orders for this date.
            </Text>
          </View>
        ) : (
          sortedCustomers.map((customer, index) => (
            <View
              key={customer.id}
              className={`p-4 flex-row justify-between items-center ${
                index !== sortedCustomers.length - 1
                  ? "border-b border-[#E6EFE7]"
                  : ""
              }`}
            >
              <View>
                <Text className="font-bold text-[#1F5A4B] text-[18px]">
                  {customer.name}
                </Text>
                <Text className="text-[#6B8F82] text-xs mt-1">
                  {customer.orders} Orders
                </Text>
              </View>

              <Text className="font-bold text-[#1F5A4B] text-[17px]">
                {customer.formattedTotal}
              </Text>
            </View>
          ))
        )}

        <View className="bg-[#F7FBF8] p-3 rounded-b-xl border-t border-[#E6EFE7]">
          <Text className="text-[#6B8F82] text-[10px] text-center">
            Showing top {sortedCustomers.length} customers this period.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default MostFrequentCustomer;
