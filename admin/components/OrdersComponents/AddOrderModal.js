import {
  Modal,
  View,
  Text,
  Pressable,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import useOrder from "../../hooks/useOrder";
import useInventory from "../../hooks/useInventory";
import SelectProductModal from "./SelectProductModal";

const AddOrderModal = ({ visible, onClose, onSave }) => {
  const { items, loading, error } = useInventory();
  const { handleCreateOrder } = useOrder();


  const availableProducts = (items ?? []).filter(
    (item) =>
      item.status === "available" &&
      Number(item.available_sets ?? item.stock) > 0
  );

  const [productModalVisible, setProductModalVisible] = useState(false);


  const [form, setForm] = useState({
    name: "",
    contact_num: "",
    address: "",
    product_name: "",
    description: "",
    delivery_schedule: "",
    delivery_fee: "",
    total: "",
    payment_status: "Unpaid",
    status: "pending",
  });

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSelectProduct = (product) => {
    const fee = Number(form.delivery_fee) || 0;
    const total = (Number(product.price) || 0) + fee

    setForm((prev) => ({
      ...prev,
      product_name: product.product_name ?? "",
      description: product.description ?? "",
      delivery_fee: prev.delivery_fee,
      total: String(total),
    }));

    setProductModalVisible(false);
  };

  const handleSave = async () => {
    const requiredFields = [
      { field: form.name, label: "Customer Name" },
      { field: form.contact_num, label: "Contact Number" },
      { field: form.address, label: "Delivery Address" },
      { field: form.product_name, label: "Product" },
      { field: form.description, label: "Package Detail" },
      { field: form.delivery_schedule, label: "Delivery Schedule" },
      { field: form.delivery_fee, label: "Delivery Fee" },
      { field: form.total, label: "Total Amount" },
    ];

    const emptyField = requiredFields.find(
      (item) => !String(item.field ?? "").trim()
    );

    if (emptyField) {
     console.log("Missing Information", `Please enter the ${emptyField.label}.`);
      return;
    }

    if (
      !Number.isFinite(Number(form.delivery_fee)) ||
      !Number.isFinite(Number(form.total)) ||
      Number(form.delivery_fee) < 0 ||
      Number(form.total) <= 0
    ) {
      Alert.alert(
        "Invalid Amount",
        "Delivery fee must be zero or greater, and total amount must be greater than zero."
      );
      return;
    }

    const newOrder = {
      order_id: `VK-${Math.floor(1000 + Math.random() * 9000)}`,
      name: form.name.trim(),
      contact_num: form.contact_num.trim(),
      address: form.address.trim(),
      product_name: form.product_name.trim(),
      description: form.description.trim(),
      delivery_schedule: form.delivery_schedule.trim(),
      delivery_fee: Number(form.delivery_fee),
      total: Number(form.total),
      payment_status: form.payment_status,
      status: form.status,
    };

    try {
      const res = await handleCreateOrder(newOrder);
      console.log("Added new order:", res);

      setForm({
        name: "",
        contact_num: "",
        address: "",
        product_name: "",
        description: "",
        delivery_schedule: "",
        delivery_fee: "",
        total: "",
        payment_status: "Unpaid",
        status: "pending",
      });

      onClose();
    } catch (err) {
      Alert.alert("Failed to create order", String(err));
    }
  };

  const paymentOptions = ["Unpaid", "50% paid", "Paid"];
  const statusOptions = ["pending", "confirmed", "closed"];

  return (
    <>
      <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
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
                value={form.name}
                onChangeText={(text) => updateField("name", text)}
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
                <Ionicons
                  name="musical-notes-outline"
                  size={19}
                  color="#1F5A4B"
                />
                <Text className="ml-2 text-[15px] font-bold text-[#1F5A4B]">
                  Package Details
                </Text>
              </View>

              <Text className="mb-1 text-[11px] text-[#6B8A84]">Product</Text>
              <Pressable
                onPress={() => setProductModalVisible(true)}
                className="mb-3 flex-row items-center justify-between rounded-[8px] border border-[#E6EFE7] bg-white px-3 py-3"
              >
                <Text
                  className={`flex-1 text-[14px] ${
                    form.product_name ? "text-[#1F5A4B]" : "text-[#A8BFB9]"
                  }`}
                >
                  {form.product_name || "Select a product"}
                </Text>
                <Ionicons name="chevron-down" size={18} color="#1F5A4B" />
              </Pressable>

              <Text className="mb-1 text-[11px] text-[#6B8A84]">
                Package Detail
              </Text>
              <TextInput
                placeholder="Package inclusions, notes, etc."
                placeholderTextColor="#A8BFB9"
                value={form.description}
                onChangeText={(text) => updateField("description", text)}
                multiline
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

            <View className="">
              <Text className="mb-1 text-[11px] text-[#6B8A84]">
                Delivery Fee
              </Text>
              <TextInput
                placeholder="300"
                placeholderTextColor="#A8BFB9"
                keyboardType="numeric"
                value={form.delivery_fee ?? ""}
                onChangeText={(value) => {
                  const product = items.find(
                    (item) => item.product_name === form.product_name
                  );

                  const total =
                    (Number(product?.price) || 0) + (Number(value) || 0);

                  setForm((prev) => ({
                    ...prev,
                    delivery_fee: value,
                    total: String(total),
                  }));
                }}
                className="mb-3 rounded-[8px] border border-[#E6EFE7] bg-white px-3 py-2.5 text-[14px] text-[#1F5A4B]"
              />

              <Text className="mb-1 text-[11px] text-[#6B8A84]">
                Total Amount
              </Text>
              <TextInput
                editable={false}
                placeholder="1800"
                placeholderTextColor="#A8BFB9"
                keyboardType="numeric"
                value={form.total ?? ""}
                className="mb-3 rounded-[8px]   border border-[#E6EFE7] bg-white px-3 py-2.5 text-[14px] text-[#1F5A4B]"
              />
            </View>
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
                      form.status === option ? "bg-[#1F5A4B]" : "bg-[#E6EFE7]"
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

      <SelectProductModal
        visible={productModalVisible}
        onClose={() => setProductModalVisible(false)}
        products={availableProducts}
        loading={loading}
        error={error}
        selectedProduct={form}
        onSelect={handleSelectProduct}
      />
    </>
  );
};

export default AddOrderModal;
