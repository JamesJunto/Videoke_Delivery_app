import { Modal, View, Text, Pressable, ScrollView } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const OrderDetailsModal = ({ visible, onClose, order }) => {
  if (!order) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-[#F7FBF8] shadow-lg">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 20, paddingBottom: 32 }}
        >
          <View className="mb-4 flex-row items-center">
            <Pressable
              onPress={onClose}
              className=" h-10 w-10 items-center justify-center ]"
            >
              <Ionicons name="arrow-back" size={24} color="#1F5A4B" />
            </Pressable>

            <View>
              <Text className="text-[26px] font-bold text-[#1F5A4B]">
                Order Details
              </Text>

              <Text className="mt-1 text-[12px] text-[#6B8A84]">
                #{order.order_id}
              </Text>

            </View>
          </View>
          <Text className="mb-3 mt-3 text-[12px] font-semibold text-[#1F5A4B] bg-[#EAF6F0] w-[24%] text-center p-2 rounded-full">
            {order.status}
          </Text>

          <View className="mb-4 rounded-[12px] border border-[#E6EFE7] bg-[#FFFDF9] p-4">

            <View className="mb-2.5 flex-row items-center">
              <Text className="text-[17px] font-bold text-[#1F5A4B]">
                Customer
              </Text>
            </View>

            <Text className="text-[16px] font-semibold text-[#1F5A4B]">
              {order.name}
            </Text>

            <View className="mt-2 flex-row items-center">
              <Ionicons
                name="call-outline"
                size={16}
                color="#6B8A84"
              />

              <Text className="ml-1 text-[13px] font-normal text-[#1F5A4B]">
                {order.phone}
              </Text>
            </View>

            <View className="my-3 h-[1.5px] bg-[#E6EFE7]" />

            <Text className="text-[12px] font-semibold text-[#1F5A4B]">
              Delivery address
            </Text>

            <Text className="text-[#1F5A4B] font-normal mt-2 text-[13px]">
              {order.address}
            </Text>

          </View>

          <View className="mb-4 rounded-[12px] border border-[#E6EFE7] bg-[#FFFDF9] p-4">
            <View className="mb-3 flex-row items-center">
              <Ionicons
                name="musical-notes-outline"
                size={19}
                color="#1F5A4B"
              />
              <Text className="ml-2 text-[15px] font-bold text-[#1F5A4B]">
                Package Details
              </Text>
            </View>

            <Text className="mb-1 text-[11px] text-[#6B8A84]">
              Product
            </Text>

            <Text className="mb-3 text-[14px] font-semibold text-[#1F5A4B]">
              {order.product_name}
            </Text>

            <Text className="mb-1 text-[11px] text-[#6B8A84]">
              Delivery Schedule
            </Text>

            <Text className="mb-3 text-[13px] text-[#6B8A84]">
              {order.delivery_schedule}
            </Text>

            <View className="my-3 h-[1px] bg-[#E6EFE7]" />

            <View className="flex-row items-center justify-between">
              <View>
                <Text className="mb-1 text-[11px] text-[#6B8A84]">
                  Order ID
                </Text>

                <Text className="text-[13px] font-medium text-[#1F5A4B]">
                  #{order.order_id}
                </Text>
              </View>

              <View className="items-end">
                <Text className="mb-1 text-[11px] text-[#6B8A84]">
                  Status
                </Text>

                <View className="rounded-full bg-[#E6EFE7] px-3 py-1">
                  <Text className="text-[11px] font-semibold capitalize text-[#1F5A4B]">
                    {order.status}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View className="mb-6 rounded-[12px] border border-[#E6EFE7] bg-[#FFFDF9] p-4">
            <View className="mb-4 flex-row items-center">
              <Ionicons
                name="wallet-outline"
                size={19}
                color="#1F5A4B"
              />

              <Text className="ml-2 text-[15px] font-bold text-[#1F5A4B]">
                Payment Details
              </Text>
            </View>

            <View className="mb-4 flex-row items-center justify-between">
              <Text className="text-[13px] text-[#6B8A84]">
                Delivery Fee
              </Text>

              <Text className="text-[13px] font-medium text-[#1F5A4B]">
                ₱{order.delivery_fee.toLocaleString()}
              </Text>
            </View>

            <View className="mb-4 flex-row items-center justify-between">
              <Text className="text-[13px] text-[#6B8A84]">
                Payment Status
              </Text>

              <Text className="text-[13px] font-semibold text-[#1F5A4B]">
                {order.payment_status}
              </Text>
            </View>

            <View className="my-2 h-[1px] bg-[#E6EFE7]" />

            <View className="mt-2 flex-row items-center justify-between">
              <Text className="text-[14px] font-semibold text-[#1F5A4B]">
                Total Amount
              </Text>

              <Text className="text-[22px] font-bold text-[#1F5A4B]">
                ₱{order.total.toLocaleString()}
              </Text>
            </View>
          </View>

          <Pressable
            onPress={onClose}
            className="items-center rounded-[12px] bg-[#1F5A4B] py-4"
          >
            <Text className="text-[14px] font-semibold text-white">
              Close
            </Text>
          </Pressable>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default OrderDetailsModal;
