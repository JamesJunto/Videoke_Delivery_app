import { useState } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import useInventory from "../../hooks/useInventory";

const InventoryForm = ({ onClose, refetch }) => {
  const { handleAddInventory } = useInventory();

  const [form, setForm] = useState({
    product_name: "",
    description: "",
    price: "",
    stock: "",
  });

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setForm({
      product_name: "",
      description: "",
      price: "",
      stock: "",
    });
  };

  const handleSubmit = async () => {
    const requiredFields = [
      { field: form.product_name, label: "Package Name" },
      { field: form.description, label: "Equipment Summary" },
      { field: form.price, label: "Daily Rate" },
      { field: form.stock, label: "Inventory" },
    ];

    const emptyField = requiredFields.find(
      (item) => !String(item.field ?? "").trim()
    );

    if (emptyField) {
      console.log("Missing information", `${emptyField.label} is required.`);
      return;
    }

    if (
      !Number.isFinite(Number(form.price)) ||
      !Number.isFinite(Number(form.stock)) ||
      Number(form.price) <= 0 ||
      Number(form.stock) <= 0
    ) {
      console.log(
        "Invalid Amount",
        "Price must be greater than zero, and inventory must be at least 1."
      );
      return;
    }

    const newInventory = {
      product_name: form.product_name.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      stock: Number(form.stock),
    };

    try {
      const res = await handleAddInventory(newInventory);
      console.log("Added new inventory:", res);

      await refetch()
      resetForm();
      onClose();
    } catch (err) {
      Alert.alert(
        "Failed to Add Inventory",
        err?.response?.data?.message ||
          err?.message ||
          "Something went wrong while saving the package."
      );
    }
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  return (
    <>
      <Text className="mb-1 text-[12px] font-semibold text-[#1F5A4B]">
        Package name
      </Text>
      <TextInput
        value={form.product_name}
        onChangeText={(value) => updateField("product_name", value)}
        placeholder="Enter package name"
        placeholderTextColor="#A8BFB9"
        className="mb-3 rounded-[10px] border border-[#E6EFE7] bg-[#FFFDF9] px-3 py-2.5 text-[13px] text-[#1F5A4B]"
      />

      <Text className="mb-1 text-[12px] font-semibold text-[#1F5A4B]">
        Equipment summary
      </Text>
      <TextInput
        value={form.description}
        onChangeText={(value) => updateField("description", value)}
        placeholder="Add included items"
        placeholderTextColor="#A8BFB9"
        multiline
        numberOfLines={2}
        className="mb-3 rounded-[10px] border border-[#E6EFE7] bg-[#FFFDF9] px-3 py-2.5 text-[13px] text-[#1F5A4B]"
        style={{ textAlignVertical: "top", minHeight: 60 }}
      />

      <Text className="mb-1 text-[12px] font-semibold text-[#1F5A4B]">
        Daily rate
      </Text>
      <TextInput
        value={form.price}
        onChangeText={(value) => updateField("price", value)}
        placeholder="₱0.00"
        placeholderTextColor="#A8BFB9"
        keyboardType="numeric"
        className="mb-3 rounded-[10px] border border-[#E6EFE7] bg-[#FFFDF9] px-3 py-2.5 text-[13px] text-[#1F5A4B]"
      />

      <Text className="mb-1 text-[12px] font-semibold text-[#1F5A4B]">
        Inventory
      </Text>
      <TextInput
        value={form.stock}
        onChangeText={(value) => updateField("stock", value)}
        placeholder="Enter total sets"
        placeholderTextColor="#A8BFB9"
        keyboardType="numeric"
        className="mb-3 rounded-[10px] border border-[#E6EFE7] bg-[#FFFDF9] px-3 py-2.5 text-[13px] text-[#1F5A4B]"
      />

      <View className="flex-row gap-3">
        <Pressable
          onPress={handleCancel}
          className="h-11 flex-1 items-center justify-center rounded-[10px] border border-[#E6EFE7] bg-[#FFFDF9]"
        >
          <Text className="text-[13px] font-semibold text-[#1F5A4B]">
            Cancel
          </Text>
        </Pressable>

        <Pressable
          onPress={handleSubmit}
          className="h-11 flex-1 items-center justify-center rounded-[10px] bg-[#1F5A4B]"
        >
          <Text className="text-[13px] font-semibold text-white">
            Create package
          </Text>
        </Pressable>
      </View>
    </>
  );
};

export default InventoryForm;
