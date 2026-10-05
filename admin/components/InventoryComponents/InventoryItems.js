import { Text, View } from "react-native";
import useInventory from "../../hooks/useInventory";

const InventoryItems = ({ filteredStatus }) => {
  const InventoryData = useInventory();

  const filteredItems =
    filteredStatus === "All"
      ? InventoryData
      : InventoryData.filter((item) => item.status === filteredStatus);

  return (
    <>
      {filteredItems.map((item) => {
        return (
          <View
            key={item.product_id}
            className="rounded-[10px] border border-gray-400 bg-white p-4 shadow-sm"
          >
            <Text className="text-[20px] font-semibold text-gray-900">
              {item.product_name}
            </Text>

            <Text className="mt-1 text-[18px] text-gray-500">
              Status: {item.status}
            </Text>

            <Text className="mt-1 text-[16px] text-gray-600">
              Quantity: {item.quantity}
            </Text>

            <Text className="mt-1 text-[16px] text-gray-600">
              Price: ₱{item.price}
            </Text>
          </View>
        );
      })}
    </>
  );
};

export default InventoryItems;