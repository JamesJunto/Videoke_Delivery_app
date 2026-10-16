import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import InventoryForm from "./inventoryForm";

const AddProductModal = ({ visible, onClose }) => {
  const { height } = useWindowDimensions();

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View className="flex-1 items-center justify-center bg-black/40 px-5">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          className="w-full"
          style={{ maxHeight: height * 0.85 }}
        >
          <View className="overflow-hidden rounded-[24px] bg-[#FFFDF9]">
            <View className="flex-row items-start justify-between px-4 pt-4 pb-2">
              <View className="flex-1 pr-3">
                <Text className="text-[18px] font-bold text-[#1F5A4B]">
                  Add package
                </Text>
                <Text className="mt-0.5 text-[12px] leading-[16px] text-[#6B8A84]">
                  Create a new rental package with pricing, inventory and
                  equipment details.
                </Text>
              </View>

              <Pressable
                onPress={onClose}
                className="h-8 w-8 items-center justify-center rounded-full bg-[#E6EFE7]"
              >
                <Ionicons name="close" size={16} color="#1F5A4B" />
              </Pressable>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{
                paddingHorizontal: 16,
                paddingTop: 6,
                paddingBottom: 12,
              }}
            >
              <InventoryForm onClose={onClose} />
            </ScrollView>

          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

export default AddProductModal;
