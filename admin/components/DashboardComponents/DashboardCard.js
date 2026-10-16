import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

const DashboardCards = () => {
  const DashboardData = [
    {
      title: "Pending Orders",
      value: 5,
      icon: "time-outline",
      description: "Need to confirm",
    },
    {
      title: "Today's Orders",
      value: 8,
      icon: "calendar-outline",
      description: "Scheduled today",
    },
    {
      title: "Unpaid",
      value: "₱4,200",
      icon: "alert-circle-outline",
      description: "From 3 orders",
    },
    {
      title: "Revenue",
      value: "₱24,850",
      icon: "cash-outline",
      description: "October 2026",
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
