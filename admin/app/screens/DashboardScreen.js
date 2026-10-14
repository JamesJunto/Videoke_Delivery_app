import { Pressable, ScrollView, Text, View } from "react-native";
import { router } from "expo-router";

import DashboardCards from "../../components/DashboardComponents/DashboardCard";
import PendingOrders from "../../components/DashboardComponents/PendingOrders";
import UpcomingDeliveries from "../../components/DashboardComponents/UpcomingDeliveries";

const DashboardScreen = () => {
  return (
    <ScrollView className="flex-1" contentContainerClassName="px-3 py-4">

      <View className="flex-row flex-wrap justify-between gap-y-3">
        <DashboardCards />
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
              View All
            </Text>
            <Text className="ml-1 text-[13px] font-medium text-[#1F5A4B]">
              →
            </Text>
          </Pressable>
        </View>

        <View className="flex-col justify-between mt-3 w-full gap-3">
          <PendingOrders />
        </View>

      </View>


      <View className="mt-4  w-full">
        <View className="flex-row items-center justify-between">
          <Text className="text-[18px] font-medium text-[#1F5A4B]">
            Upcoming Deliveries
          </Text>

          <Pressable
            className="flex-row items-center active:opacity-60"
            onPress={() => router.push("/screens/OrdersScreen")}
          >
            <Text className="text-[13px] font-medium text-[#1F5A4B]">
              View All
            </Text>
            <Text className="ml-1 text-[13px] font-medium text-[#1F5A4B]">
              →
            </Text>
          </Pressable>
        </View>

        <View className="flex-col justify-between mt-3 w-full gap-3">
          <UpcomingDeliveries />
        </View>

      </View>


    </ScrollView>
  );
};

export default DashboardScreen;
