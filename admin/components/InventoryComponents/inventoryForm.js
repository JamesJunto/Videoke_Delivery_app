import { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native"
import useInventory from "../../hooks/useInventory";
const InventoryForm = () => {
  const { handleAddInventory } = useInventory()

  const [form, setForm] = useState({
    productName: "",
    category: "",
    quantity: "",
    price: "",
    supplier: "",
  });

  const updateField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      await handleAddInventory(form);
      console.log("Inventory added successfully");
    } catch (error) {
      console.error("Failed to add inventory:", error);
    }
  }

  return (
    <View className="rounded-xl bg-white p-5">
      <Text className="mb-2 text-sm font-semibold text-gray-600">
        Product Name
      </Text>

      <TextInput
        value={form.productName}
        onChangeText={(value) => updateField("productName", value)}
        className="mb-4 h-12 rounded-lg border border-gray-500 bg-gray-50 px-4 text-[15px] text-gray-800"
        placeholder="Enter product name"
        placeholderTextColor="#999"
      />

      <Text className="mb-2 text-sm font-semibold text-gray-600">
        Category
      </Text>

      <TextInput
        value={form.category}
        onChangeText={(value) => updateField("category", value)}
        className="mb-4 h-12 rounded-lg border border-gray-500 bg-gray-50 px-4 text-[15px] text-gray-800"
        placeholder="Enter category"
        placeholderTextColor="#999"
      />

      <Text className="mb-2 text-sm font-semibold text-gray-600">
        Quantity
      </Text>

      <TextInput
        value={form.quantity}
        onChangeText={(value) => updateField("quantity", value)}
        className="mb-4 h-12 rounded-lg border border-gray-500 bg-gray-50 px-4 text-[15px] text-gray-800"
        placeholder="Enter quantity"
        placeholderTextColor="#999"
        keyboardType="numeric"
      />

      <Text className="mb-2 text-sm font-semibold text-gray-600">
        Price
      </Text>

      <TextInput
        value={form.price}
        onChangeText={(value) => updateField("price", value)}
        className="mb-4 h-12 rounded-lg border border-gray-500 bg-gray-50 px-4 text-[15px] text-gray-800"
        placeholder="Enter price"
        placeholderTextColor="#999"
        keyboardType="numeric"
      />

      <Text className="mb-2 text-sm font-semibold text-gray-600">
        Supplier
      </Text>

      <TextInput
        value={form.supplier}
        onChangeText={(value) => updateField("supplier", value)}
        className="mb-4 h-12 rounded-lg border border-gray-500 bg-gray-50 px-4 text-[15px] text-gray-800"
        placeholder="Enter supplier"
        placeholderTextColor="#999"
      />

      <Pressable
        onPress={handleSubmit}
        className="h-10 items-center justify-center rounded-[10px] bg-[#C1272D] active:opacity-80"
      >
        <Text className="text-[16px] font-semibold text-white">
          Add Inventory
        </Text>
      </Pressable>
    </View>
  );
};

export default InventoryForm;
