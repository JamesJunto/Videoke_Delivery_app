import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

import DashboardData from "../../data/DashboardData";

const DashboardScreen = () => {
  return (
    <View className="flex-1 px-3 py-4">
      <Text className="mb-4 text-xl font-bold text-gray-900">Dashboard</Text>

      <View className="flex-row flex-wrap justify-between gap-y-3">
        {DashboardData.map((item) => (
          <View
            key={item.title}
            className="w-[48%] rounded-xl border border-gray-200 bg-white p-3"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 5,
              elevation: 1,
            }}
          >
            <Ionicons name={item.icon} size={35} color="#C1272D" />
            <Text className="text-[12px] uppercase mt-1 text-gray-600">
              {item.title}
            </Text>

            <Text className="mt-0.5 text-xl font-bold text-gray-900">
              {item.value}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default DashboardScreen;
