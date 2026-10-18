import { Text, View } from "react-native";

const formatDeliveryDate = (schedule) => {
  if (!schedule) return "Schedule not set";

  const date = new Date(schedule);

  if (Number.isNaN(date.getTime())) return schedule;

  return date.toLocaleString("en-PH", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const PendingOrders = ({ pendingOrders = [] }) => {
  const visibleOrders = pendingOrders.slice(0, 2);

  return (
    <View className="w-full rounded-[12px] bg-[#FFFDF9] border border-[#E6EFE7] overflow-hidden">
      {visibleOrders.length > 0 ? (
        visibleOrders.map((order, index) => (
          <View key={order.order_id}>
            {index !== 0 && (
              <View className="h-[1px] bg-[#E6EFE7] mx-4" />
            )}

            <View className="p-4 flex-row justify-between items-start">
              <View className="flex-1 pr-3">
                <Text className="text-[18px] font-bold text-[#1F5A4B]">
                  {order.name}
                </Text>

                <Text className="mt-1 text-[14px] text-[#6B8A84]">
                  #{order.order_id} · {order.product_name} · {formatDeliveryDate(order.delivery_schedule)}
                </Text>
              </View>

              <Text className="text-[18px] font-bold text-[#1F5A4B]">
                ₱{Number(order.total || 0).toLocaleString("en-PH", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </Text>
            </View>
          </View>
        ))
      ) : (
        <View className="p-6 items-center">
          <Text className="text-[14px] text-[#6B8A84]">
            No pending orders right now.
          </Text>
        </View>
      )}
    </View>
  );
};

export default PendingOrders;
