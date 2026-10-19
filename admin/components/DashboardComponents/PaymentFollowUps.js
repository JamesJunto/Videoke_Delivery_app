import { Text, View } from "react-native";
import useOrder from "../../hooks/useOrder";
import getPaymentFollowUps from "../../utils/getPaymentFollowUps";

const PaymentFollowUps = () => {
  const { orders } = useOrder();
  const paymentFollowUps = getPaymentFollowUps(orders);

  const formatCurrency = (amount) =>
    `₱${(Number(amount) || 0).toLocaleString("en-PH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const getRemainingBalance = (order) => {
    const total = Number(order.total) || 0;

    return order.payment_status === "50% paid" ? total * 0.5 : total;
  };

  if (paymentFollowUps.length === 0) {
    return (
      <View className="w-full rounded-[12px] p-4">
        <Text className="text-center text-[14px] text-[#1F5A4B] ">
          No outstanding payments.
        </Text>
      </View>
    );
  }

  return (
    <View className="w-full gap-3">
      {paymentFollowUps.map((order) => (
        <View
          key={order.order_id}
          className="w-full rounded-[12px] border border-[#E6EFE7] bg-[#FFFDF9] p-4"
        >
          <View className="flex-row items-center justify-between">
            <Text className="text-[15px] font-semibold text-[#1F5A4B]">
              {order.order_id}
            </Text>

            <View
              className={`rounded-full px-3 py-1 ${
                order.payment_status === "Unpaid"
                  ? "bg-red-100"
                  : "bg-amber-100"
              }`}
            >
              <Text
                className={`text-[12px] font-semibold ${
                  order.payment_status === "Unpaid"
                    ? "text-red-700"
                    : "text-amber-700"
                }`}
              >
                {order.payment_status}
              </Text>
            </View>
          </View>

          <Text className="mt-3 text-[16px] font-semibold text-[#1F5A4B]">
            {order.name || "Unknown Customer"}
          </Text>

          <View className="mt-3 flex-row items-center justify-between">
            <Text className="text-[13px] text-[#6B8A84]">
              Order Total
            </Text>
            <Text className="text-[13px] font-medium text-[#1F5A4B]">
              {formatCurrency(order.total)}
            </Text>
          </View>

          <View className="mt-2 flex-row items-center justify-between">
            <Text className="text-[13px] text-[#6B8A84]">
              Remaining Balance
            </Text>
            <Text className="text-[15px] font-bold text-[#B22222]">
              {formatCurrency(getRemainingBalance(order))}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default PaymentFollowUps;
