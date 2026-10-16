import { Modal, View, Text, Pressable, ScrollView, TextInput } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import useOrder from "../../hooks/useOrder";
const AddOrderModal = ({ visible, onClose, onSave }) => {

  const { handleCreateOrder } =  useOrder()

  const [form, setForm] = useState({
    name: "",
    contact_num: "",
    address: "",
    product_name: "",
    package_detail: "",
    delivery_schedule: "",
    delivery_fee: "",
    total: "",
    payment_status: "Unpaid",
  });

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {

    const newOrder = {
      order_id: `VK-${Math.floor(1000 + Math.random() * 9000)}`,
      name: form.name,
      contact_num: form.contact_num,
      address: form.address,
      product_name: form.product_name,
      package_detail: form.package_detail,
      delivery_schedule: form.delivery_schedule,
      delivery_fee: Number(form.delivery_fee) || 0,
      total: Number(form.total) || 0,
      payment_status: form.payment_status,
    };

    const res = await handleCreateOrder(newOrder)
    console.log('Added new order: ', res)

    setForm({
         customer_name: "",
         contact_num: "",
         address: "",
         product_name: "",
         package_detail: "",
         delivery_schedule: "",
         delivery_fee: "",
         total: "",
         payment_status: "Unpaid",
         status: "pending",
       });


    onClose();
  };

  const paymentOptions = ["Unpaid", "50% paid", "Paid"];
  const statusOptions = ["pending", "confirmed", "closed"];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-[#F7FBF8]">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 20, paddingBottom: 32 }}
        >
          <View className="mb-6 flex-row items-center">
            <Pressable
              onPress={onClose}
              className="h-10 w-10 items-center justify-center rounded-full bg-[#E6EFE7] mr-3"
            >
              <Ionicons name="arrow-back" size={24} color="#1F5A4B" />
            </Pressable>

            <Text className="text-[22px] font-bold text-[#1F5A4B]">
              Add Order
            </Text>
          </View>

          <View className="mb-4 rounded-[12px] border border-[#E6EFE7] bg-[#FFFDF9] p-4">
            <View className="mb-3 flex-row items-center">
              <Ionicons name="person-outline" size={19} color="#1F5A4B" />
              <Text className="ml-2 text-[15px] font-bold text-[#1F5A4B]">
                Customer
              </Text>
            </View>

            <Text className="mb-1 text-[11px] text-[#6B8A84]">
              Customer Name
            </Text>
            <TextInput
              placeholder="Juan Dela Cruz"
              placeholderTextColor="#A8BFB9"
              value={form.customer_name}
              onChangeText={(text) => updateField("customer_name", text)}
              className="mb-3 rounded-[8px] border border-[#E6EFE7] bg-white px-3 py-2.5 text-[14px] text-[#1F5A4B]"
            />

            <Text className="mb-1 text-[11px] text-[#6B8A84]">
              Contact Number
            </Text>
            <TextInput
              placeholder="0909090909"
              placeholderTextColor="#A8BFB9"
              keyboardType="phone-pad"
              value={form.contact_num}
              onChangeText={(text) => updateField("contact_num", text)}
              className="mb-3 rounded-[8px] border border-[#E6EFE7] bg-white px-3 py-2.5 text-[14px] text-[#1F5A4B]"
            />

            <Text className="mb-1 text-[11px] text-[#6B8A84]">
              Delivery Address
            </Text>
            <TextInput
              placeholder="123 Rizal St., Davao City"
              placeholderTextColor="#A8BFB9"
              value={form.address}
              onChangeText={(text) => updateField("address", text)}
              multiline
              className="rounded-[8px] border border-[#E6EFE7] bg-white px-3 py-2.5 text-[14px] text-[#1F5A4B]"
            />
          </View>

          <View className="mb-4 rounded-[12px] border border-[#E6EFE7] bg-[#FFFDF9] p-4">
            <View className="mb-3 flex-row items-center">
              <Ionicons name="musical-notes-outline" size={19} color="#1F5A4B" />
              <Text className="ml-2 text-[15px] font-bold text-[#1F5A4B]">
                Package Details
              </Text>
            </View>

            <Text className="mb-1 text-[11px] text-[#6B8A84]">
              Product
            </Text>
            <TextInput
              placeholder="Premium Videoke Package"
              placeholderTextColor="#A8BFB9"
              value={form.product_name}
              onChangeText={(text) => updateField("product_name", text)}
              className="mb-3 rounded-[8px] border border-[#E6EFE7] bg-white px-3 py-2.5 text-[14px] text-[#1F5A4B]"
            />

            <Text className="mb-1 text-[11px] text-[#6B8A84]">
              Package Detail
            </Text>
            <TextInput
              placeholder="17–18 Oct 2026 · 1 day · Qty 1"
              placeholderTextColor="#A8BFB9"
              value={form.package_detail}
              onChangeText={(text) => updateField("package_detail", text)}
              className="mb-3 rounded-[8px] border border-[#E6EFE7] bg-white px-3 py-2.5 text-[14px] text-[#1F5A4B]"
            />

            <Text className="mb-1 text-[11px] text-[#6B8A84]">
              Delivery Schedule
            </Text>
            <TextInput
              placeholder="Oct 17, 2026 · 9:00 AM"
              placeholderTextColor="#A8BFB9"
              value={form.delivery_schedule}
              onChangeText={(text) => updateField("delivery_schedule", text)}
              className="rounded-[8px] border border-[#E6EFE7] bg-white px-3 py-2.5 text-[14px] text-[#1F5A4B]"
            />
          </View>

          <View className="mb-6 rounded-[12px] border border-[#E6EFE7] bg-[#FFFDF9] p-4">
            <View className="mb-3 flex-row items-center">
              <Ionicons name="wallet-outline" size={19} color="#1F5A4B" />
              <Text className="ml-2 text-[15px] font-bold text-[#1F5A4B]">
                Payment Details
              </Text>
            </View>

            <Text className="mb-1 text-[11px] text-[#6B8A84]">
              Delivery Fee
            </Text>
            <TextInput
              placeholder="300"
              placeholderTextColor="#A8BFB9"
              keyboardType="numeric"
              value={form.delivery_fee}
              onChangeText={(text) => updateField("delivery_fee", text)}
              className="mb-3 rounded-[8px] border border-[#E6EFE7] bg-white px-3 py-2.5 text-[14px] text-[#1F5A4B]"
            />

            <Text className="mb-1 text-[11px] text-[#6B8A84]">
              Total Amount
            </Text>
            <TextInput
              placeholder="1800"
              placeholderTextColor="#A8BFB9"
              keyboardType="numeric"
              value={form.total}
              onChangeText={(text) => updateField("total", text)}
              className="mb-3 rounded-[8px] border border-[#E6EFE7] bg-white px-3 py-2.5 text-[14px] text-[#1F5A4B]"
            />

            <Text className="mb-1 text-[11px] text-[#6B8A84]">
              Payment Status
            </Text>
            <View className="mb-3 flex-row gap-2">
              {paymentOptions.map((option) => (
                <Pressable
                  key={option}
                  onPress={() => updateField("payment_status", option)}
                  className={`rounded-full px-3 py-1.5 ${
                    form.payment_status === option
                      ? "bg-[#1F5A4B]"
                      : "bg-[#E6EFE7]"
                  }`}
                >
                  <Text
                    className={`text-[12px] font-semibold ${
                      form.payment_status === option
                        ? "text-white"
                        : "text-[#1F5A4B]"
                    }`}
                  >
                    {option}
                  </Text>
                </Pressable>
              ))}
            </View>

            <Text className="mb-1 text-[11px] text-[#6B8A84]">
              Order Status
            </Text>
            <View className="flex-row gap-2">
              {statusOptions.map((option) => (
                <Pressable
                  key={option}
                  onPress={() => updateField("status", option)}
                  className={`rounded-full px-3 py-1.5 ${
                    form.status === option
                      ? "bg-[#1F5A4B]"
                      : "bg-[#E6EFE7]"
                  }`}
                >
                  <Text
                    className={`text-[12px] font-semibold capitalize ${
                      form.status === option
                        ? "text-white"
                        : "text-[#1F5A4B]"
                    }`}
                  >
                    {option}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          <Pressable
            onPress={handleSave}
            className="items-center rounded-[12px] bg-[#1F5A4B] py-4 active:opacity-80"
          >
            <Text className="text-[14px] font-semibold text-white">
              Save Order
            </Text>
          </Pressable>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default AddOrderModal;
