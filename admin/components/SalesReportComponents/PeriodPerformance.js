import React from "react";
import { Text, View } from "react-native";
import calculateRevenue from "../../utils/calculateRevenue";

const PeriodPerformance = ({ date, orders = [] }) => {

  const filteredOrders = orders
    .sort((a, b) => new Date(b.delivery_schedule) - new Date(a.delivery_schedule))
    .filter((order) => {
      const scheduleDate = new Date(order.delivery_schedule).toLocaleDateString("en-CA");
      const isSameDate = scheduleDate === date;
      const isDelivered = order.status === "delivered";


      return isSameDate && isDelivered;
    });

  const totalOrders = filteredOrders.length;

  const totalRevenue = calculateRevenue(filteredOrders);

  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  const PERIOD_PERFORMANCE = {
    revenue: `₱${totalRevenue.toLocaleString()}`,
    orders: totalOrders.toString(),
    avgOrderValue: `₱${avgOrderValue.toLocaleString()}`,
  };

  return (
    <View className="mb-6">
      <Text className="text-[#1F5A4B] font-bold text-lg mb-3">Period Performance</Text>

      <View className="bg-[#FFFDF9] rounded-xl p-4 border border-[#E6EFE7] mb-4">
        <Text className="text-[#1F5A4B] text-[18px] font-semibold mb-1">Total Revenue</Text>
        <Text className="text-[24px] font-bold text-[#1F5A4B] mb-1">{PERIOD_PERFORMANCE.revenue}</Text>
        <Text className="text-[#6B8F82] text-xs mb-3">Gross sales generated on {date}.</Text>
        <View className="h-[1px] bg-[#E6EFE7] w-full mb-2" />
        <Text className="text-[#6B8F82] text-[10px] italic">Based on delivered orders.</Text>
      </View>

      <View className="bg-[#FFFDF9] rounded-xl p-4 border border-[#E6EFE7]">
        <Text className="text-[#1F5A4B] text-[18px] font-semibold mb-1">Total Orders Fulfilled</Text>
        <Text className="text-[24px] font-bold text-[#1F5A4B] mb-1">{PERIOD_PERFORMANCE.orders}</Text>
        <Text className="text-[#6B8F82] text-xs mb-3">Total number of successful deliveries.</Text>
        <View className="h-[1px] bg-[#E6EFE7] w-full mb-2" />
        <Text className="text-[#6B8F82] text-[10px] italic">Average order value: {PERIOD_PERFORMANCE.avgOrderValue}</Text>
      </View>
    </View>
  );
};

export default PeriodPerformance;
