import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { DashboardData } from "../../data/DashboardData";

const DashboardCards = () => {
  return (
    <>
      {DashboardData.map((item) => (
        <View
          key={item.title}
          className="w-[48%] rounded-[15px] border border-gray-200 bg-white p-3"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 5,
            elevation: 1,
          }}
        >
          <Ionicons name={item.icon} size={38} color="#C1272D" />

          <Text className="mt-1 text-[12px] uppercase text-gray-600">
            {item.title}
          </Text>

          <Text className="mt-0.5 text-xl font-bold text-gray-900">
            {item.value}
          </Text>
        </View>
      ))}
    </>
  );
};

export default DashboardCards;
