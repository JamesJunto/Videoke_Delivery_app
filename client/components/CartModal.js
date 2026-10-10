import {
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useCart } from "../context/cartContext";
import useOrders from "../hooks/useOrders";
const formatPrice = (value) =>
  `₱${value.toLocaleString("en-PH", {
    minimumFractionDigits: 2,
  })}`;

const CartModal = ({ visible, onClose }) => {
  const { cart, removeFromCart } = useCart();
  const { handleAddOrder } = useOrders()

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckOut = async () => {
    try {
      const order = {
        order_id: 222,
        customer_id: 1,
        items: cart,
        total: total,
      };

     await handleAddOrder(order);

      console.log("Order added");
      onClose();
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };
  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onClose}
    >
      <SafeAreaView className="flex-1 bg-white">

        <View className="flex-row items-center justify-between border-b border-gray-100 px-5 py-4">
          <View>
            <Text className="text-xl font-bold text-gray-900">Cart</Text>

            <Text className="mt-0.5 text-sm text-gray-400">
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </Text>
          </View>

          <Pressable onPress={onClose} hitSlop={10}>
            <Text className="text-base text-gray-500">Close</Text>
          </Pressable>
        </View>


        {cart.length === 0 ? (
          <View className="flex-1 items-center justify-center">
            <Text className="text-gray-400">Your cart is empty</Text>
          </View>
        ) : (
          <>

            <ScrollView
              className="flex-1 px-5"
              showsVerticalScrollIndicator={false}
            >
              {cart.map((item) => (
                <View
                  key={item.product_id}
                  className="flex-row border-b border-gray-100 py-4"
                >

                  <View className="h-20 w-20 items-center justify-center rounded-lg bg-gray-100">
                    <Text className="text-xs text-gray-400">Image</Text>
                  </View>


                  <View className="ml-4 flex-1">
                    <Text className="text-base font-semibold text-gray-900">
                      {item.name}
                    </Text>

                    <Text className="mt-1 text-sm text-gray-400">
                      Category: {item.category}
                    </Text>

                    <View className="mt-2 flex-row items-center">
                      <Text className="text-sm text-gray-500">
                        {formatPrice(item.price)}
                      </Text>

                      <Text className="mx-2 text-gray-300">×</Text>

                      <Text className="text-sm text-gray-500">
                        {item.quantity}
                      </Text>
                    </View>

                    <Text className="mt-1 text-sm font-bold text-gray-900">
                      Subtotal: {formatPrice(item.price * item.quantity)}
                    </Text>
                  </View>


                  <Pressable
                    onPress={() => removeFromCart(item.product_id)}
                    className="ml-2 h-9 w-9 items-center justify-center rounded-full bg-red-50 active:opacity-70"
                    hitSlop={8}
                  >
                    <Text className="text-sm font-bold text-red-600">✕</Text>
                  </Pressable>
                </View>
              ))}
            </ScrollView>


            <View className="border-t border-gray-100 px-5 py-4">
              <View className="mb-4 flex-row items-center justify-between">
                <Text className="text-gray-500">Total</Text>

                <Text className="text-lg font-bold text-gray-900">
                  {formatPrice(total)}
                </Text>
              </View>

              <Pressable
                onPress={() => handleCheckOut()}
                className="items-center rounded-lg bg-[#B22222] py-3.5 active:opacity-90"
              >
                <Text className="font-semibold text-white">Checkout</Text>
              </Pressable>
            </View>
          </>
        )}
      </SafeAreaView>
    </Modal>
  );
};

export default CartModal;
