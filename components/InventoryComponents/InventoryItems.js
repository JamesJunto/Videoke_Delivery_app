import { Text, View } from "react-native";
import { InventoryData } from "../../data/InventoryData";

const InventoryItems = ({ filteredStatus }) => {
  const filteredItems =
    filteredStatus === "All"
      ? InventoryData
      : InventoryData.filter((item) => item.status === filteredStatus);

  return (
    <>
      {filteredItems.map((item) => {
        return (
          <View
            key={item.id}
            className="rounded-[10px] border border-gray-200 bg-white p-3"
          >
            <Text className="text-[16px] font-semibold text-gray-900">
              {item.name}
            </Text>

            <Text className="mt-1 text-[13px] text-gray-500">
              {item.status}
            </Text>
          </View>
        );
      })}
    </>
  );
};

export default InventoryItems;
