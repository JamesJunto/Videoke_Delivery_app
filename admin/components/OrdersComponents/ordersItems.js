import { Text, View, Pressable, ActivityIndicator } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import OrderDetailsModal from "./OrderItemsModal";
import useOrder from "../../hooks/useOrder";
import OrderEditModal from "./OrderEditModal";

const OrdersItems = ({ filteredStatus, searchQuery = "" }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editOrder, setEditOrder] = useState(null);
  const { orders, loading, fetchOrders } = useOrder();

  const filteredOrders = orders.filter((order) => {
    const statusMatch =
      filteredStatus === "All" || order.status === filteredStatus;

    const searchMatch =
      searchQuery.trim() === "" ||
      order.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.order_id.toLowerCase().includes(searchQuery.toLowerCase());

    return statusMatch && searchMatch;
  });

  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return { bg: "bg-[#E6EFE7]", text: "text-[#1F5A4B]", label: "Pending" };
      case "confirmed":
        return { bg: "bg-[#D9EFE3]", text: "text-[#1F5A4B]", label: "Confirmed" };
      case "closed":
        return { bg: "bg-gray-100", text: "text-gray-600", label: "Closed" };
      default:
        return { bg: "bg-gray-100", text: "text-gray-600", label: status };
    }
  };

  if (loading) {
    return (
      <View className="items-center justify-center py-12">
        <ActivityIndicator size="large" color="#1F5A4B" />
        <Text className="mt-3 text-[13px] text-[#6B8A84]">
          Loading orders...
        </Text>
      </View>
    );
  }

  if (filteredOrders.length === 0) {
    return (
      <View className="items-center justify-center py-12">
        <Ionicons name="receipt-outline" size={42} color="#6B8A84" />
        <Text className="mt-3 text-[16px] font-bold text-[#1F5A4B]">
          No orders found
        </Text>
        <Text className="mt-1 text-center text-[13px] text-[#6B8A84]">
          Orders will appear here once they are created.
        </Text>
      </View>
    );
  }

  return (
    <>
      {filteredOrders.map((order) => {
        const status = getStatusStyle(order.status);

        return (
          <View
            key={order.order_id}
            className="rounded-[12px] border border-[#E6EFE7] bg-[#FFFDF9] p-4"
          >
            <Pressable onPress={() => setSelectedOrder(order)}>
              <View className="flex-row items-center justify-between">
                <Text className="text-[16px] font-medium text-[#6B8A84]">
                  #{order.order_id}
                </Text>

                <View className="flex-row items-center">
                  <View className={`rounded-full px-2.5 py-0.5 ${status.bg}`}>
                    <Text className={`text-[13px] font-semibold ${status.text}`}>
                      {status.label}
                    </Text>
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    size={14}
                    color="#6B8A84"
                    style={{ marginLeft: 4 }}
                  />
                </View>
              </View>

              <Text className="mt-1.5 text-[18px] font-bold text-[#1F5A4B]">
                {order.name}
              </Text>

              <Text className="mt-0.5 text-[14px] text-[#6B8A84]">
                {order.phone} · {order.product_name}
              </Text>

              <Text
                numberOfLines={1}
                className="mt-0.5 text-[14px] text-[#6B8A84]"
              >
                {order.description}
              </Text>
            </Pressable>

            <View className="my-2 h-[1px] bg-[#E6EFE7]" />

            <View className="flex-row items-center justify-between">
              <Text className="text-[19px] font-bold text-[#1F5A4B]">
                ₱{Number(order.total || 0).toLocaleString()}
              </Text>

              <Pressable
                onPress={() => setEditOrder(order)}
                hitSlop={8}
                className="rounded-[10px] bg-[#E6EFE7] px-3 py-1.5 active:opacity-70"
              >
                <Text className="text-[14px] font-semibold text-[#1F5A4B]">
                  Edit Order
                </Text>
              </Pressable>
            </View>
          </View>
        );
      })}

      <OrderDetailsModal
        visible={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        order={selectedOrder}
      />

      <OrderEditModal
        visible={!!editOrder}
        onClose={() => setEditOrder(null)}
        order={editOrder}
        onSave={fetchOrders}
        refetch={fetchOrders}
      />



    </>
  );
};

export default OrdersItems;
