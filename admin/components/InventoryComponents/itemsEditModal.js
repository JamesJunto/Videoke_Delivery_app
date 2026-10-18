import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Switch,
  Text,
  TextInput,
  View,
  Alert,
} from "react-native";
import useInventory from "../../hooks/useInventory";

const ItemsEditModal = ({ visible, onClose, item }) => {
  const { handleUpdateInventory, fetchInventory } = useInventory();

  const [form, setForm] = useState({
    product_name: "",
    description: "",
    price: "",
    stock: "",
    available: false,
  });

  useEffect(() => {
    if (item) {
      setForm({
        product_name: item.product_name ?? "",
        description: item.description ?? "",
        price: String(item.price ?? ""),
        stock: String(item.stock ?? item.quantity ?? ""),
        available: item.status === "available",
      });
    }
  }, [item]);

  const setField = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    if (!item) return;

    const requiredFields = [
      { field: form.product_name, label: "Package Name" },
      { field: form.description, label: "Equipment Summary" },
      { field: form.price, label: "Price" },
      { field: form.stock, label: "Inventory Quantity" },
    ];

    const emptyField = requiredFields.find(
      (item) => !String(item.field ?? "").trim()
    );

    if (emptyField) {
      Alert.alert("Missing information", `${emptyField.label} is required.`);
      return;
    }

    if (
      !Number.isFinite(Number(form.price)) ||
      !Number.isFinite(Number(form.stock)) ||
      Number(form.price) <= 0 ||
      Number(form.stock) <= 0
    ) {
      Alert.alert(
        "Invalid Amount",
        "Price must be greater than zero, and inventory must be at least 1."
      );
      return;
    }

    const updatedItem = {
      product_name: form.product_name.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      stock: Number(form.stock),
      status: form.available ? "available" : "unavailable",
    };

    try {
      const res = await handleUpdateInventory(item.product_id, updatedItem);
      console.log("Updated inventory:", res);
      onClose();
    } catch (err) {
      console.log(
        "Failed to Update Package",
        err?.response?.data?.message ||
          err?.message ||
          "Something went wrong while saving the package."
      );
    }
  };

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
              {form.product_name || "Premium Videoke Package"}
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
              onChangeText={(v) => setField("product_name", v)}
              className="mt-1.5 rounded-[8px] border border-[#E6EFE7] bg-[#FFFDF9] px-3 py-2.5 text-[14px] text-[#1F5A4B]"
            />

            <Text className="mt-3 text-[13px] font-medium text-[#1F5A4B]">
              Description
            </Text>
            <TextInput
              value={form.description}
              onChangeText={(v) => setField("description", v)}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              className="mt-1.5 rounded-[8px] border border-[#E6EFE7] bg-[#FFFDF9] px-3 py-2.5 text-[14px] text-[#1F5A4B]"
              style={{ minHeight: 80 }}
            />

            <Text className="mt-3 text-[13px] font-medium text-[#1F5A4B]">
              Price (PHP)
            </Text>
            <View className="mt-1.5 flex-row items-center rounded-[8px] border border-[#E6EFE7] bg-[#FFFDF9] px-3">
              <Text className="text-[14px] text-[#1F5A4B]">₱</Text>
              <TextInput
                value={form.price}
                onChangeText={(v) => setField("price", v)}
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
              value={form.stock}
              onChangeText={(v) => {
                if (/^\d*$/.test(v)) setField("stock", v);
              }}
              keyboardType="numeric"
              className="mt-1.5 rounded-[8px] border border-[#E6EFE7] bg-[#FFFDF9] px-3 py-2.5 text-[14px] text-[#1F5A4B]"
            />

            <View className="mt-3 flex-row items-center justify-between">
              <View className="flex-1 pr-3">
                <Text className="text-[14px] font-semibold text-[#1F5A4B]">
                  Available
                </Text>
              </View>

              <Switch
                value={form.available}
                onValueChange={(v) => setField("available", v)}
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
            onPress={handleSave}
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
