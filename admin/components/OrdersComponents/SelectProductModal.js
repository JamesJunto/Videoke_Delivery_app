import {
  Modal,
  View,
  Text,
  Pressable,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SelectProductModal = ({ visible, onClose, products, loading = false, error = null, selectedProduct, onSelect }) => {

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/40">
        <View className="max-h-[75%] rounded-t-[20px] bg-[#F7FBF8] p-5">
          <View className="mb-4 flex-row items-center justify-between">
            <Text className="text-[18px] font-bold text-[#1F5A4B]">
              Select Product
            </Text>
            <Pressable
              onPress={onClose}
              className="h-9 w-9 items-center justify-center rounded-full bg-[#E6EFE7]"
            >
              <Ionicons name="close" size={20} color="#1F5A4B" />
            </Pressable>
          </View>

          {loading ? (
            <Text className="py-6 text-center text-[13px] text-[#6B8A84]">
              Loading products...
            </Text>
          ) : error ? (
            <Text className="py-6 text-center text-[13px] text-red-500">
              Failed to load products.
            </Text>
          ) : products.length === 0 ? (
            <Text className="py-6 text-center text-[13px] text-[#6B8A84]">
              No available products.
            </Text>
          ) : (
            <ScrollView showsVerticalScrollIndicator={false}>
              {products.map((product) => {
                const label = product.product_name ?? "Unnamed product";
                const selected = selectedProduct === label;
                const stock = Number(product.stock ?? 0);

                return (
                  <Pressable
                    key={product.id ?? label}
                    onPress={() => onSelect?.(product)}
                    className={`mb-2 flex-row items-center justify-between rounded-[10px] border px-4 py-3 ${
                      selected
                        ? "border-[#1F5A4B] bg-[#E6EFE7]"
                        : "border-[#E6EFE7] bg-white"
                    }`}
                  >
                    <View className="flex-1 pr-2">
                      <Text className="text-[14px] font-semibold text-[#1F5A4B]">
                        {label}
                      </Text>
                      <Text className="mt-0.5 text-[11px] text-[#6B8A84]">
                        {stock} set{stock === 1 ? "" : "s"} available
                      </Text>
                    </View>
                    {selected && (
                      <Ionicons
                        name="checkmark-circle"
                        size={20}
                        color="#1F5A4B"
                      />
                    )}
                  </Pressable>
                );
              })}
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default SelectProductModal;
