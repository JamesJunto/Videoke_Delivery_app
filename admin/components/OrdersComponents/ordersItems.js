import { Text, View, Pressable } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import OrderDetailsModal from "./OrderItemsModal";

const OrdersItems = ({ filteredStatus, searchQuery = "" }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const orders = [
    {
      order_id: "VK-1050",
      customer_name: "Carlo Mendoza",
      product_name: "Premium Videoke Package",
      package_detail: "17–18 Oct 2026 · 1 day · Qty 1",
      contact_num: "0909090909",
      address: "123 Rizal St., Davao City",
      delivery_date: "2026-10-17",
      delivery_time: "09:00 AM",
      total: 1800,
      payment_status: "Unpaid",
      delivery_fee: 300,
      status: "pending",
    },
    {
      order_id: "VK-1049",
      customer_name: "Ana Reyes",
      product_name: "Standard Videoke Package",
      package_detail: "15–16 Oct 2026 · 1 day · Qty 1",
      contact_num: "09261444682",
      address: "Bajada, Davao City",
      delivery_schedule: "Oct 17, 2026 · 9:00 AM",
      total: 1200,
      payment_status: "Unpaid",
      delivery_fee: 300,
      status: "pending",
    },
    {
      order_id: "VK-1020",
      customer_name: "Carlo Mendoza",
      product_name: "Premium Videoke Package",
      package_detail: "17–18 Oct 2026 · 1 day · Qty 1",
      contact_num: "0909090909",
      address: "123 Rizal St., Davao City",
      delivery_schedule: "Oct 17, 2026 · 9:00 AM",
      total: 1800,
      payment_status: "Unpaid",
      delivery_fee: 300,
      status: "pending",
    }
  ];

  const filteredOrders = orders.filter((order) => {
    const statusMatch =
      filteredStatus === "All" || order.status === filteredStatus;

    const searchMatch =
      searchQuery.trim() === "" ||
      order.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.order_id.toLowerCase().includes(searchQuery.toLowerCase());

    return statusMatch && searchMatch;
  });

  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return {
          bg: "bg-[#E6EFE7]",
          text: "text-[#1F5A4B]",
          label: "Pending",
        };
      case "confirmed":
        return {
          bg: "bg-[#D9EFE3]",
          text: "text-[#1F5A4B]",
          label: "Confirmed",
        };
      case "closed":
        return {
          bg: "bg-gray-100",
          text: "text-gray-600",
          label: "Closed",
        };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-600",
          label: status,
        };
    }
  };

  return (
    <>
      {filteredOrders.map((order) => {
        const status = getStatusStyle(order.status);

        return (
          <Pressable
            key={order.order_id}
            onPress={() => {
              setSelectedOrder(order);
            }}
            className="rounded-[12px] border border-[#E6EFE7] bg-[#FFFDF9] p-4"
          >
            <View className="flex-row items-center justify-between">
              <Text className="text-[12px] font-medium text-[#6B8A84]">
                #{order.order_id}
              </Text>

              <View className="flex-row items-center">
                <View className={`rounded-full px-3 py-1 ${status.bg}`}>
                  <Text className={`text-[11px] font-semibold ${status.text}`}>
                    {status.label}
                  </Text>
                </View>

                <Ionicons
                  name="chevron-forward"
                  size={16}
                  color="#6B8A84"
                  style={{ marginLeft: 6 }}
                />
              </View>
            </View>

            <Text className="mt-2 text-[17px] font-bold text-[#1F5A4B]">
              {order.customer_name}
            </Text>

            <Text className="mt-0.5 text-[13px] text-[#6B8A84]">
              {order.product_name}
            </Text>

            <Text className="mt-0.5 text-[12px] text-[#6B8A84]">
              {order.package_detail}
            </Text>

            <View className="mt-2 flex-row items-center">
              <Ionicons name="calendar-outline" size={13} color="#6B8A84" />

              <Text className="ml-1 text-[12px] text-[#6B8A84]">
                {order.delivery_schedule}
              </Text>
            </View>

            <View className="mt-1 flex-row items-center">
              <Ionicons name="location-outline" size={13} color="#6B8A84" />

              <Text className="ml-1 text-[12px] text-[#6B8A84]">
                {order.address}
              </Text>
            </View>

            <View className="my-3 h-[1px] bg-[#E6EFE7]" />

            <View className="flex-row items-center justify-between">
              <Text className="text-[20px] font-bold text-[#1F5A4B]">
                ₱{order.total.toLocaleString()}
              </Text>

              <Text className="text-[12px] text-[#6B8A84]">
                {order.payment_status} · incl. ₱{order.delivery_fee} delivery
              </Text>
            </View>
          </Pressable>
        );
      })}

      <OrderDetailsModal
        visible={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        order={selectedOrder}
      />
    </>
  );
};

export default OrdersItems;
