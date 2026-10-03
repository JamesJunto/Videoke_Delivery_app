import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import InventoryForm from "./inventoryForm";

const AddProductModal = ({ visible, onClose }) => {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 bg-white"
        style={{ paddingTop: insets.top }}
      >
        <View className="items-end px-5 pt-3">
          <Pressable
            onPress={onClose}
            hitSlop={12}
            className="h-9 w-9 items-center justify-center rounded-full bg-gray-100 active:bg-gray-200"
          >
            <Text className="text-[16px] text-gray-600">✕</Text>
          </Pressable>
        </View>

        <ScrollView
          className="flex-1"
          contentContainerClassName="px-6 pt-2 pb-8"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text className="mb-6 text-[28px] font-semibold tracking-tight text-gray-900">
            Add inventory
          </Text>

          <InventoryForm />
        </ScrollView>

        <View
          className="border-t border-gray-400 bg-white px-6 pt-3"
          style={{ paddingBottom: insets.bottom + 12 }}
        >
          <Pressable className="h-10 items-center justify-center rounded-[10px] bg-[#C1272D] active:opacity-80">
            <Text className="text-[16px] font-semibold text-white">
              Add inventory
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default AddProductModal;
