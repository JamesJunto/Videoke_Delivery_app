
import { Text, View } from "react-native";

const OrderRecord = () => {
  const orders = [
    {
      order_id: 1001,
      product_name: "Videoke Machine",
      quantity: 1,
      total: 1500,
      date: "October 6, 2026",
      status: "Ongoing",
    },
    {
      order_id: 1002,
      product_name: "Wireless Microphone",
      quantity: 2,
      total: 800,
      date: "October 3, 2026",
      status: "Delivered",
    },
    {
      order_id: 1003,
      product_name: "Speaker Set",
      quantity: 1,
      total: 1200,
      date: "September 28, 2026",
      status: "Delivered",
    },
  ];

  return (
    <>
      {orders.map((order) => (
        <View
          key={order.order_id}
          className="rounded-[12px] border border-gray-200 bg-white p-4"
        >
          <View className="flex-row items-center justify-between">
            <Text className="text-[14px] font-semibold text-gray-500">
              Order #{order.order_id}
            </Text>

            <View
              className={`rounded-full px-3 py-1 ${
                order.status === "Ongoing"
                  ? "bg-red-100"
                  : "bg-gray-100"
              }`}
            >
              <Text
                className={`text-[12px] font-semibold ${
                  order.status === "Ongoing"
                    ? "text-[#C1272D]"
                    : "text-gray-600"
                }`}
              >
                {order.status}
              </Text>
            </View>
          </View>

          {/* Product */}
          <Text className="mt-4 text-[18px] font-bold text-gray-900">
            {order.product_name}
          </Text>

          {/* Quantity */}
          <Text className="mt-1 text-[14px] text-gray-500">
            Quantity: {order.quantity}
          </Text>

          {/* Date + Total */}
          <View className="mt-4 flex-row items-end justify-between border-t border-gray-200 pt-3">
            <View>
              <Text className="text-[12px] text-gray-400">
                Order Date
              </Text>

              <Text className="mt-1 text-[14px] text-gray-700">
                {order.date}
              </Text>
            </View>

            <View className="items-end">
              <Text className="text-[12px] text-gray-400">
                Total
              </Text>

              <Text className="mt-1 text-[18px] font-bold text-[#C1272D]">
                ₱{order.total}
              </Text>
            </View>
          </View>
        </View>
      ))}
    </>
  );
};

export default OrderRecord;
