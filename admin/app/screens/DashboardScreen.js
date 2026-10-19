import { Pressable, ScrollView, Text, View } from "react-native";
import { router } from "expo-router";
import useOrder from "../../hooks/useOrder";

import calculatePendingCount from "../../utils/calculatePendingCount.js"
import calculateTodayOrderCount from "../../utils/calculateTodayOrderCount";
import calculateUnpaidTotal from "../../utils/calculateUnpaidTotal";
import calculateRevenue from "../../utils/calculateRevenue.js";
import calculateUnpaidCount from "../../utils/calculateUnpaidCount.js";

import DashboardCards from "../../components/DashboardComponents/DashboardCard";
import PendingOrders from "../../components/DashboardComponents/PendingOrders";
import PaymentFollowUps from "../../components/DashboardComponents/PaymentFollowUps.js";

const DashboardScreen = () => {
  const { orders } = useOrder();
  const dateNow = new Date().toLocaleDateString("en-CA");

  const pendingOrders = orders.filter((order) => order.status === "pending");
  const pendingCount = calculatePendingCount(orders);

  const todayOrderCount = calculateTodayOrderCount(orders, dateNow);
  const unpaidTotal = calculateUnpaidTotal(orders);
  const totalRevenue = calculateRevenue(orders)

  const UnpaidCount = calculateUnpaidCount(orders)

  return (
    <ScrollView className="flex-1" contentContainerClassName="px-3 py-4">
      <View className="flex-row flex-wrap justify-between gap-y-3">
        <DashboardCards
          pendingCount={pendingCount}
          todayOrderCount={todayOrderCount}
          unpaidTotal={unpaidTotal}
          totalRevenue={totalRevenue}
          unpaidCount={ UnpaidCount}
        />
      </View>

      <View className="mt-4 w-full">
        <View className="flex-row items-center justify-between">
          <Text className="text-[18px] font-medium text-[#1F5A4B]">
            Pending Orders
          </Text>

          <Pressable
            className="flex-row items-center active:opacity-60"
            onPress={() => router.push("/screens/OrdersScreen")}
          >
            <Text className="text-[13px] font-medium text-[#1F5A4B]">
              View All · {pendingOrders.length}
            </Text>
            <Text className="ml-1 text-[13px] font-medium text-[#1F5A4B]">
              →
            </Text>
          </Pressable>
        </View>

        <View className="flex-col justify-between mt-3 w-full gap-3">
          <PendingOrders pendingOrders={pendingOrders} />
        </View>
      </View>

      <View className="mt-4 w-full">
        <View className="flex-row items-center justify-between">
          <Text className="text-[18px] font-medium text-[#1F5A4B]">
            Unpaid Orders
          </Text>

        </View>

        <View className="flex-col justify-between mt-3 w-full gap-3">
          <PaymentFollowUps/>
        </View>
      </View>
    </ScrollView>
  );
};

export default DashboardScreen;
