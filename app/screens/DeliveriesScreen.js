import { Pressable, ScrollView, Text, View } from "react-native";
import DeliveryList from "../../components/DeliveryComponents/DeliveryList";
const DeliveriesScreen = () => {
  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView
        className="flex-1 px-3"
        contentContainerClassName="pb-24 pt-5"
      >
        <Text className="mb-4 text-xl font-bold text-gray-900">Deliveries</Text>

        <View className="flex-col gap-y-2">
          <DeliveryList />
        </View>
      </ScrollView>

      <View className="absolute bottom-2 right-5">
        <Pressable
          onPress={() => console.log("Add Customer Pressed")}
          className="h-4 p-4 flex-row items-center rounded-[10px] bg-[#C1272D] px-3"
        >
          <Text className="mr-1 text-[24px] font-bold text-white">+</Text>

          <Text className="text-[18px] font-semibold text-white">
            Schedule Delivery
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default DeliveriesScreen;
