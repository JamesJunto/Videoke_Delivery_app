import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";

const ItemsEditModal = ({ visible, onClose, item }) => {
  const [form, setForm] = useState({
    product_name: item?.product_name ?? "",
    description: item?.description ?? "",
    price: item?.price ?? "",
    quantity: item?.quantity ?? "",
    available: item?.status === "available",
  });

  const availableCount = item?.available_sets ?? 5;
  const rentedCount = 3;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-[#F7FBF8]">

        <View className="flex-row items-center px-4 pt-4 pb-3">
          <Pressable onPress={onClose} hitSlop={10} className="mr-3">
            <Ionicons name="arrow-back" size={24} color="#1F5A4B" />
          </Pressable>

          <View>
            <Text className="text-[22px] font-bold text-[#1F5A4B]">
              Edit Package
            </Text>
            <Text className="text-[12px] text-[#6B8A84]">
              {item?.product_name ?? "Premium Videoke Package"}
            </Text>
          </View>
        </View>

        <ScrollView
          className="flex-1"
          contentContainerClassName="px-4 pb-32 gap-4"
          showsVerticalScrollIndicator={false}
        >

          <View className="rounded-[12px] border border-[#E6EFE7] bg-[#FFFDF9] p-4">
            <Text className="text-[15px] font-bold text-[#1F5A4B]">
              Package information
            </Text>

            <Text className="mt-3 text-[13px] font-medium text-[#1F5A4B]">
              Package name
            </Text>
            <TextInput
              value={form.product_name}
              onChangeText={(v) => setForm({ ...form, product_name: v })}
              className="mt-1.5 rounded-[8px] border border-[#E6EFE7] bg-[#FFFDF9] px-3 py-2.5 text-[14px] text-[#1F5A4B]"
            />

            <Text className="mt-3 text-[13px] font-medium text-[#1F5A4B]">
              Description
            </Text>
            <TextInput
              value={form.description}
              onChangeText={(v) => setForm({ ...form, description: v })}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              className="mt-1.5 rounded-[8px] border border-[#E6EFE7] bg-[#FFFDF9] px-3 py-2.5 text-[14px] text-[#1F5A4B]"
              style={{ minHeight: 80 }}
            />

            <Text className="mt-3 text-[13px] font-medium text-[#1F5A4B]">
              Daily price (PHP)
            </Text>
            <View className="mt-1.5 flex-row items-center rounded-[8px] border border-[#E6EFE7] bg-[#FFFDF9] px-3">
              <Text className="text-[14px] text-[#1F5A4B]">₱</Text>
              <TextInput
                value={String(form.price)}
                onChangeText={(v) => setForm({ ...form, price: v })}
                keyboardType="numeric"
                className="ml-2 flex-1 py-2.5 text-[14px] text-[#1F5A4B]"
              />
            </View>
          </View>

          <View className="rounded-[12px] border border-[#E6EFE7] bg-[#FFFDF9] p-4">
            <Text className="text-[15px] font-bold text-[#1F5A4B]">
              Inventory & availability
            </Text>

            <Text className="mt-3 text-[13px] font-medium text-[#1F5A4B]">
              Total inventory quantity
            </Text>
            <TextInput
              value={`${form.quantity} sets`}
              editable={false}
              className="mt-1.5 rounded-[8px] border border-[#E6EFE7] bg-[#F7F9F8] px-3 py-2.5 text-[14px] text-[#6B8A84]"
            />

            <View className="mt-3 flex-row items-center justify-between">
              <Text className="text-[13px] text-[#6B8A84]">
                Current allocation
              </Text>
              <Text className="text-[13px] font-semibold text-[#1F5A4B]">
                {availableCount} available · {rentedCount} rented
              </Text>
            </View>

            <View className="mt-3 flex-row items-center justify-between">
              <View className="flex-1 pr-3">
                <Text className="text-[14px] font-semibold text-[#1F5A4B]">
                  Available for booking
                </Text>
                <Text className="mt-0.5 text-[12px] text-[#6B8A84]">
                  Accept new rental orders.
                </Text>
              </View>

              <Switch
                value={form.available}
                onValueChange={(v) => setForm({ ...form, available: v })}
                trackColor={{ false: "#E6EFE7", true: "#1F5A4B" }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>

          <Text className="px-1 text-[12px] leading-[17px] text-[#6B8A84]">
            Price changes apply to new orders only. Existing bookings keep
            their original rate.
          </Text>
        </ScrollView>

        <View className="absolute bottom-0 left-0 right-0 border-t border-[#E6EFE7] bg-[#EAF6F0] px-4 py-3">
          <Pressable
            onPress={() => {
              onClose();
            }}
            className="flex-row items-center justify-center gap-2 rounded-[12px] bg-[#1F5A4B] py-3.5 active:opacity-80"
          >
            <Ionicons name="checkmark" size={18} color="#FFFFFF" />
            <Text className="text-[15px] font-semibold text-white">
              Save Changes
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default ItemsEditModal;
