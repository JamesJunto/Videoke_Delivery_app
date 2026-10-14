import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

const DashboardCards = () => {
  const DashboardData = [
    {
      title: "Active Rentals",
      value: 22,
      icon: "people-outline",
      description: "Currently rented out",
    },
    {
      title: "Available Sets",
      value: 46,
      icon: "cube-outline",
      description: "Ready for booking",
    },
    {
      title: "Deliveries",
      value: 32,
      icon: "bicycle-outline",
      description: "Scheduled this week",
    },
    {
      title: "Revenue",
      value: "₱24,850",
      icon: "cash-outline",
      description: "Earned this month",
    },
  ];

  return (
    <>
      {DashboardData.map((item) => (
        <View
          key={item.title}
          className="relative w-[48%] min-h-[130px] rounded-[15px] bg-[#FFFDF9] border border-[#E6EFE7] p-4 justify-center"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 5,
            elevation: 1,
          }}
        >
          <View className="absolute top-2 right-2 rounded-full bg-[#E6EFE7] p-2">
            <Ionicons name={item.icon} size={18} color="#1F5A4B" />
          </View>

          <View>
            <Text className="text-[11px] uppercase font-medium text-[#6B8A84]">
              {item.title}
            </Text>

            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              className="mt-0.5 text-[24px] font-bold text-[#1F5A4B]"
            >
              {item.value}
            </Text>

            <Text
              numberOfLines={2}
              className="mt-1 text-[12px] leading-[14px] text-[#6B8A84]"
            >
              {item.description}
            </Text>
          </View>
        </View>
      ))}
    </>
  );
};

export default DashboardCards;
