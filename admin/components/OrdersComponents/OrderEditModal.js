import {
  View,
  Text,
  Modal,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
  TextInput,
} from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

import useOrder from "../../hooks/useOrder";
import useInventory from "../../hooks/useInventory";
import SelectProductModal from "./SelectProductModal";

const OrderEditModal = ({ visible, onClose, order, onSave }) => {
  const { handleUpdateOrder } = useOrder();
  const { items, loading, error } = useInventory();
  const [saving, setSaving] = useState(false);

  const [productModalVisible, setProductModalVisible] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

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

  useEffect(() => {
    if (order) {
      setForm({
        name: order.name ?? "",
        contact_num: order.contact_num ?? order.phone ?? "",
        address: order.address ?? "",
        product_name: order.product_name ?? "",
        description: order.description ?? "",
        delivery_schedule: order.delivery_schedule
          ? order.delivery_schedule.slice(0, 10)
          : "",
        delivery_fee: order.delivery_fee ?? "",
        total: String(order.total ?? ""),
        payment_status: order.payment_status ?? "Unpaid",
        status: order.status ?? "pending",
      });

      if (order.delivery_schedule) {
        setDeliveryDate(
          new Date(`${order.delivery_schedule.slice(0, 10)}T12:00:00`),
        );
      } else {
        setDeliveryDate(new Date());
      }
    }
  }, [order]);

  const availableProducts = (items ?? []).filter(
    (item) =>
      item.status === "available" &&
      Number(item.available_sets ?? item.stock) > 0,
  );

  const setField = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSelectProduct = (product) => {
    const fee = Number(form.delivery_fee) || 0;
    const total = (Number(product.price) || 0) + fee;

    setForm((prev) => ({
      ...prev,
      product_name: product.product_name ?? "",
      description: product.description ?? "",
      total: String(total),
    }));

    setProductModalVisible(false);
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (event.type !== "set" || !selectedDate) return;

    setDeliveryDate(selectedDate);
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const day = String(selectedDate.getDate()).padStart(2, "0");
    setField("delivery_schedule", `${year}-${month}-${day} 00:00:00`);
  };

  const handleSave = async () => {
    if (!order) return;

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
      (item) => !String(item.field ?? "").trim(),
    );

    if (emptyField) {
      Alert.alert("Missing information", `${emptyField.label} is required.`);
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
        "Delivery fee must be zero or greater, and total amount must be greater than zero.",
      );
      return;
    }

    const updatedOrder = {
      name: form.name.trim(),
      contact_num: form.contact_num.trim(),
      address: form.address.trim(),
      product_name: form.product_name.trim(),
      description: form.description.trim(),
      delivery_schedule: form.delivery_schedule,
      delivery_fee: Number(form.delivery_fee),
      total: Number(form.total),
      payment_status: form.payment_status,
      status: form.status,
    };

    try {
      setSaving(true);
      await handleUpdateOrder(order.order_id, updatedOrder);
      onClose();
      if (onSave) onSave();
    } catch (err) {
      Alert.alert("Failed to Update Order", err?.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  const statusOptions = ["pending", "confirmed", "closed"];
  const paymentOptions = ["Unpaid", "50% paid", "Paid"];

  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return { bg: "bg-[#E6EFE7]", text: "text-[#1F5A4B]", label: "Pending" };
      case "confirmed":
        return {
          bg: "bg-[#D9EFE3]",
          text: "text-[#1F5A4B]",
          label: "Confirmed",
        };
      case "closed":
        return { bg: "bg-gray-100", text: "text-gray-600", label: "Closed" };
      default:
        return { bg: "bg-gray-100", text: "text-gray-600", label: status };
    }
  };

  return (
    <>
      <Modal
        visible={visible}
        animationType="slide"
        transparent
        onRequestClose={onClose}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          className="flex-1"
        >
          <View className="flex-1 justify-end bg-black/40">
            <View className="max-h-[90%] rounded-t-[24px] bg-[#FFFDF9]">
              <View className="flex-row items-center justify-between border-b border-[#E6EFE7] px-5 py-4">
                <View>
                  <Text className="text-[18px] font-bold text-[#1F5A4B]">
                    Edit Order
                  </Text>
                  <Text className="mt-0.5 text-[12px] text-[#6B8A84]">
                    #{order?.order_id}
                  </Text>
                </View>
                <Pressable
                  onPress={onClose}
                  hitSlop={8}
                  className="rounded-full bg-[#E6EFE7] p-2"
                >
                  <Ionicons name="close" size={20} color="#1F5A4B" />
                </Pressable>
              </View>

              <ScrollView
                className="px-5"
                contentContainerStyle={{
                  paddingVertical: 16,
                  paddingBottom: 32,
                }}
                keyboardShouldPersistTaps="handled"
              >
                <Text className="mb-2 text-[13px] font-semibold text-[#1F5A4B]">
                  Status
                </Text>
                <View className="mb-4 flex-row flex-wrap gap-2">
                  {statusOptions.map((s) => {
                    const st = getStatusStyle(s);
                    const active = form.status === s;
                    return (
                      <Pressable
                        key={s}
                        onPress={() => setField("status", s)}
                        className={`rounded-full px-4 py-2 ${
                          active ? st.bg : "bg-white border border-[#E6EFE7]"
                        }`}
                      >
                        <Text
                          className={`text-[12px] font-semibold ${
                            active ? st.text : "text-[#6B8A84]"
                          }`}
                        >
                          {st.label}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>

                <Field label="Customer Name">
                  <TextInput
                    value={form.name}
                    onChangeText={(v) => setField("name", v)}
                    placeholder="Juan Dela Cruz"
                    placeholderTextColor="#A0B5B0"
                    className="rounded-[12px] border border-[#E6EFE7] bg-white px-4 py-3 text-[14px] text-[#1F5A4B]"
                  />
                </Field>

                <Field label="Contact Number">
                  <TextInput
                    value={form.contact_num}
                    onChangeText={(v) => setField("contact_num", v)}
                    placeholder="0917 123 4567"
                    placeholderTextColor="#A0B5B0"
                    keyboardType="phone-pad"
                    className="rounded-[12px] border border-[#E6EFE7] bg-white px-4 py-3 text-[14px] text-[#1F5A4B]"
                  />
                </Field>

                <Field label="Address">
                  <TextInput
                    value={form.address}
                    onChangeText={(v) => setField("address", v)}
                    placeholder="Full delivery address"
                    placeholderTextColor="#A0B5B0"
                    multiline
                    numberOfLines={2}
                    className="rounded-[12px] border border-[#E6EFE7] bg-white px-4 py-3 text-[14px] text-[#1F5A4B]"
                    style={{ minHeight: 60, textAlignVertical: "top" }}
                  />
                </Field>

                <Field label="Product">
                  <Pressable
                    onPress={() => setProductModalVisible(true)}
                    className="flex-row items-center justify-between rounded-[12px] border border-[#E6EFE7] bg-white px-4 py-3"
                  >
                    <Text
                      className={`flex-1 text-[14px] ${
                        form.product_name ? "text-[#1F5A4B]" : "text-[#A0B5B0]"
                      }`}
                    >
                      {form.product_name || "Select a product"}
                    </Text>
                    <Ionicons name="chevron-down" size={18} color="#1F5A4B" />
                  </Pressable>
                </Field>

                <Field label="Package Detail">
                  <TextInput
                    value={form.description}
                    onChangeText={(v) => setField("description", v)}
                    placeholder="Notes about the order"
                    placeholderTextColor="#A0B5B0"
                    multiline
                    numberOfLines={3}
                    className="rounded-[12px] border border-[#E6EFE7] bg-white px-4 py-3 text-[14px] text-[#1F5A4B]"
                    style={{ minHeight: 80, textAlignVertical: "top" }}
                  />
                </Field>

                <Field label="Delivery Schedule">
                  {Platform.OS === "web" ? (
                    <View className="rounded-[12px] border border-[#E6EFE7] bg-white px-4 py-3">
                      <input
                        type="date"
                        min={new Date().toLocaleDateString("en-CA")}
                        value={form.delivery_schedule.slice(0, 10)}
                        onChange={(event) => {
                          const date = event.target.value;
                          if (!date) return;
                          setDeliveryDate(new Date(`${date}T12:00:00`));
                          setField("delivery_schedule", `${date} 00:00:00`);
                        }}
                        style={{
                          width: "100%",
                          border: "none",
                          outline: "none",
                          background: "transparent",
                          color: "#1F5A4B",
                          fontSize: 14,
                        }}
                      />
                    </View>
                  ) : (
                    <>
                      <Pressable
                        onPress={() => setShowDatePicker(true)}
                        className="flex-row items-center justify-between rounded-[12px] border border-[#E6EFE7] bg-white px-4 py-3"
                      >
                        <Text
                          className={`text-[14px] ${
                            form.delivery_schedule
                              ? "text-[#1F5A4B]"
                              : "text-[#A0B5B0]"
                          }`}
                        >
                          {form.delivery_schedule
                            ? deliveryDate.toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })
                            : "Select delivery date"}
                        </Text>
                        <Ionicons
                          name="calendar-outline"
                          size={20}
                          color="#1F5A4B"
                        />
                      </Pressable>

                      {showDatePicker && (
                        <DateTimePicker
                          value={deliveryDate}
                          mode="date"
                          display="default"
                          minimumDate={new Date()}
                          onChange={handleDateChange}
                        />
                      )}
                    </>
                  )}
                </Field>

                <Field label="Delivery Fee (₱)">
                  <TextInput
                    value={String(form.delivery_fee ?? "")}
                    onChangeText={(value) => {
                      const product = items.find(
                        (item) => item.product_name === form.product_name,
                      );
                      const total =
                        (Number(product?.price) || 0) + (Number(value) || 0);

                      setForm((prev) => ({
                        ...prev,
                        delivery_fee: value,
                        total: String(total),
                      }));
                    }}
                    placeholder="0"
                    placeholderTextColor="#A0B5B0"
                    keyboardType="numeric"
                    className="rounded-[12px] border border-[#E6EFE7] bg-white px-4 py-3 text-[14px] text-[#1F5A4B]"
                  />
                </Field>

                <Field label="Total (₱)">
                  <TextInput
                    value={String(form.total ?? "")}
                    onChangeText={(v) => setField("total", v)}
                    placeholder="0"
                    placeholderTextColor="#A0B5B0"
                    keyboardType="numeric"
                    className="rounded-[12px] border border-[#E6EFE7] bg-white px-4 py-3 text-[14px] text-[#1F5A4B]"
                  />
                </Field>

                <Field label="Payment Status">
                  <View className="flex-row flex-wrap gap-2">
                    {paymentOptions.map((option) => (
                      <Pressable
                        key={option}
                        onPress={() => setField("payment_status", option)}
                        className={`rounded-full px-4 py-2 ${
                          form.payment_status === option
                            ? "bg-[#1F5A4B]"
                            : "bg-white border border-[#E6EFE7]"
                        }`}
                      >
                        <Text
                          className={`text-[12px] font-semibold ${
                            form.payment_status === option
                              ? "text-white"
                              : "text-[#6B8A84]"
                          }`}
                        >
                          {option}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                </Field>
              </ScrollView>

              <View className="flex-row items-center gap-3 border-t border-[#E6EFE7] px-5 py-4">
                <Pressable
                  onPress={onClose}
                  disabled={saving}
                  className="flex-1 items-center justify-center rounded-[12px] border border-[#E6EFE7] bg-white px-4 py-3"
                >
                  <Text className="text-[14px] font-semibold text-[#1F5A4B]">
                    Cancel
                  </Text>
                </Pressable>

                <Pressable
                  onPress={handleSave}
                  disabled={saving}
                  className="flex-1 flex-row items-center justify-center rounded-[12px] bg-[#1F5A4B] px-4 py-3"
                  style={{ opacity: saving ? 0.6 : 1 }}
                >
                  {saving ? (
                    <ActivityIndicator color="#FFFDF9" />
                  ) : (
                    <>
                      <Ionicons name="checkmark" size={18} color="#FFFDF9" />
                      <Text className="ml-2 text-[14px] font-semibold text-[#FFFDF9]">
                        Save Changes
                      </Text>
                    </>
                  )}
                </Pressable>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
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

const Field = ({ label, children }) => (
  <View className="mb-4">
    <Text className="mb-2 text-[13px] font-semibold text-[#1F5A4B]">
      {label}
    </Text>
    {children}
  </View>
);

export default OrderEditModal;
