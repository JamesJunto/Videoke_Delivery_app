import { ScrollView, Text, View } from "react-native";

import DashboardCards from "../../components/DashboardComponents/DashboardCard";
import RecentDeliveries from "../../components/DashboardComponents/RecentDeliveries";

const DashboardScreen = () => {
  return (
    <ScrollView className="flex-1" contentContainerClassName="px-3 py-4">
      <Text className="mb-4 text-xl font-bold text-gray-900">Dashboard</Text>

      <View className="flex-row flex-wrap justify-between gap-y-3">
        <DashboardCards />
      </View>

      <View className="mt-4 w-full">
        <Text className="text-[18px] font-medium text-gray-600">
          RECENT DELIVERIES
        </Text>

        <View className=" flex-col justify-between mt-3 w-full gap-3">
          <RecentDeliveries />
        </View>
      </View>
    </ScrollView>
  );
};

export default DashboardScreen;
