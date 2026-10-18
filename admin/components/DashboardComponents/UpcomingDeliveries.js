import { Text, View } from "react-native";

const UpcomingDeliveries = () => {
  const deliveries = [
    {
      id: 1,
      time: "Today, 2:00 PM",
      status: "Scheduled",
      customer: "James Santos",
      bookingCode: "#VK-1048",
      address: "24 Maginhawa St., Teachers Village, QC",
    },

  ];

  return (
    <View className="w-full gap-3">
      {deliveries.map((item) => (
        <View
          key={item.id}
          className="w-full rounded-[12px] bg-[#FFFDF9] border border-[#E6EFE7] p-4"
        >
          <View className="flex-row items-center justify-between">
            <Text className="text-[15px] font-semibold text-[#1F5A4B]">
              {item.time}
            </Text>

            <View className="rounded-full bg-[#E6EFE7] px-3 py-1">
              <Text className="text-[12px] font-semibold text-[#1F5A4B]">
                {item.status}
              </Text>
            </View>
          </View>

          <Text className="mt-3 text-[16px] font-semibold text-[#1F5A4B]">
            {item.customer} · {item.bookingCode}
          </Text>

          <Text className="mt-1 text-[13px] text-[#6B8A84]">
            {item.address}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default UpcomingDeliveries;
