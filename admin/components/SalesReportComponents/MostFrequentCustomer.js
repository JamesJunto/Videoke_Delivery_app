import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";

const MostFrequentCustomer = ({ orders = [], date }) => {
  const [showAll, setShowAll] = useState(false);

  const targetDate = date ? String(date).slice(0, 10) : "";

  const deliveredOrders = orders.filter((order) => {
    if (!order.delivery_schedule) return false;

    const scheduleDate = new Date(
      order.delivery_schedule
    ).toLocaleDateString("en-CA");

    const orderStatus = String(order.status || "").trim().toLowerCase();

    return scheduleDate === targetDate && orderStatus === "delivered";
  });

  const customerMap = deliveredOrders.reduce((acc, order) => {
    const customerId = order.customer_id;
    const customerName = order.customer_name || order.name;

    const paymentStatus = String(order.payment_status || "")
      .trim()
      .toLowerCase();

    if (!customerId || !customerName || paymentStatus !== "paid") {
      return acc;
    }

    if (!acc[customerId]) {
      acc[customerId] = {
        customer_id: customerId,
        name: customerName,
        orders: 0,
        revenue: 0,
      };
    }

    acc[customerId].orders += 1;
    acc[customerId].revenue += Number(order.subtotal) || 0;

    return acc;
  }, {});

  const sortedCustomers = Object.values(customerMap)
    .sort((a, b) => b.orders - a.orders || b.revenue - a.revenue)
    .map((customer) => ({
      ...customer,
      id: String(customer.customer_id),
      formattedRevenue: `₱${customer.revenue.toLocaleString("en-PH")}`,
    }));

  const displayedCustomers = showAll
    ? sortedCustomers
    : sortedCustomers.slice(0, 3);

  return (
    <View className="mb-8">
      <View className="flex-row justify-between items-end mb-3">
        <Text className="text-[#1F5A4B] font-bold text-lg">
          Most Frequent Customer
        </Text>

        {sortedCustomers.length > 3 && (
          <Pressable onPress={() => setShowAll(!showAll)}>
            <Text className="text-[#1F5A4B] text-xs font-medium">
              {showAll ? "Show Less ↑" : "View All →"}
            </Text>
          </Pressable>
        )}
      </View>

      {displayedCustomers.length === 0 ? (
        <View className="items-center justify-center py-4">
          <Text className="text-[#1F5A4B] text-sm">
            No paid, delivered customers for this date.
          </Text>
        </View>
      ) : (
        <View className="bg-[#FFFDF9] rounded-xl border border-[#E6EFE7]">
          {displayedCustomers.map((customer, index) => (
            <View
              key={customer.id}
              className={`p-4 flex-row justify-between items-center ${
                index !== displayedCustomers.length - 1
                  ? "border-b border-[#E6EFE7]"
                  : ""
              }`}
            >
              <View className="flex-1">
                <View className="flex-row items-center mb-1">
                  <Text className="font-bold text-[#1F5A4B] text-[16px]">
                    {customer.name}
                  </Text>

                  <View className="bg-[#EAF4EE] px-2 py-0.5 rounded-full ml-2 border border-[#D1E8D5]">
                    <Text className="text-[#1F5A4B] text-[12px] font-bold">
                      Top {index + 1}
                    </Text>
                  </View>
                </View>

                <Text className="text-[#6B8F82] text-[15px]">
                  {customer.orders}{" "}
                  {customer.orders === 1 ? "Order" : "Orders"}
                </Text>
              </View>

              <View className="items-end">
                <Text className="font-bold text-[18px] text-[#1F5A4B]">
                  {customer.formattedRevenue}
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default MostFrequentCustomer;
