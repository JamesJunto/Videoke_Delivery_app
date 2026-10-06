import { ScrollView, Text, View } from "react-native";
import OrderRecord from "../../components/OrderComponents/OrderRecord";

const OrdersScreen = () => {
  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-3 px-3 pb-24 pt-4"
      >
        <Text className="text-xl font-bold text-gray-900">
          My Orders
        </Text>

        <OrderRecord />
      </ScrollView>
    </View>
  );
};

export default OrdersScreen;
