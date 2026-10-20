import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";

const TopSellingProduct = ({ orders = [], date }) => {
  const [showAll, setShowAll] = useState(false);

  const targetDate = date ? String(date).slice(0, 10) : "";

  const deliveredOrders = orders.filter((order) => {
    if (!order.delivery_schedule) return false;

    const scheduleDate = new Date(order.delivery_schedule).toLocaleDateString("en-CA");
    const orderStatus = String(order.status || "").trim().toLowerCase();

    return scheduleDate === targetDate && orderStatus === "delivered";
  })

  const productMap = deliveredOrders.reduce((acc, order) => {
    const productName = order.product_name || order.productName;

    if (!productName) return acc;

    if (!acc[productName]) {
      acc[productName] = {
        name: productName,
        orders: 0,
        revenue: 0,
      };
    }

    acc[productName].orders += 1;

    acc[productName].revenue += Number(order.subtotal) || 0;

    return acc;
  }, {});

  const sortedProducts = Object.values(productMap)
    .sort((a, b) => b.orders - a.orders)
    .map((product, index) => ({
      ...product,
      id: index.toString(),
      formattedRevenue: `₱${product.revenue.toLocaleString()}`,
    }));

  const displayedProducts = showAll ? sortedProducts : sortedProducts.slice(0, 3);

  return (
    <View className="mb-8">
      <View className="flex-row justify-between items-end mb-3">
        <Text className="text-[#1F5A4B] font-bold text-lg">Top Selling Products</Text>

        {sortedProducts.length > 3 && (
          <Pressable onPress={() => setShowAll(!showAll)}>
            <Text className="text-[#1F5A4B] text-xs font-medium">
              {showAll ? "Show Less ↑" : "View All →"}
            </Text>
          </Pressable>
        )}
      </View>

      <View className="bg-[#FFFDF9] rounded-xl border border-[#E6EFE7]">
        {displayedProducts.length === 0 ? (
          <View className="p-4 items-center justify-center">
            <Text className="text-[#6B8F82] text-sm">No delivered products for this date.</Text>
          </View>
        ) : (
          displayedProducts.map((product, index) => (
            <View
              key={product.id}
              className={`p-4 flex-row justify-between items-center ${
                index !== displayedProducts.length - 1 ? "border-b border-[#E6EFE7]" : ""
              }`}
            >
              <View className="flex-1">
                <View className="flex-row items-center mb-1">
                  <Text className="font-bold text-[#1F5A4B] text-[16px]">{product.name}</Text>
                  <View className="bg-[#EAF4EE] px-2 py-0.5 rounded-full ml-2 border border-[#D1E8D5]">
                    <Text className="text-[#1F5A4B] text-[12px] font-bold">Top {index + 1}</Text>
                  </View>
                </View>
                <Text className="text-[#6B8F82] text-[15px]">{product.orders} Orders</Text>
              </View>
              <View className="items-end">
                <Text className="font-bold text-[18px] text-[#1F5A4B]">{product.formattedRevenue}</Text>
              </View>
            </View>
          ))
        )}
      </View>
    </View>
  );
};

export default TopSellingProduct;
