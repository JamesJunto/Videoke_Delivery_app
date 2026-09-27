import { Text, View } from "react-native";
import { CustomerData } from "../../data/CustomersData";

const CustomerListCard = () => {
  return (
    <>
      {CustomerData.map((customer) => {
        let statusBg = "bg-gray-100";
        let statusText = "text-gray-600";

        if (customer.status === "Delivered") {
          statusBg = "bg-green-100";
          statusText = "text-green-700";
        } else if (customer.status === "Ongoing") {
          statusBg = "bg-blue-100";
          statusText = "text-blue-700";
        } else if (customer.status === "Pending") {
          statusBg = "bg-yellow-100";
          statusText = "text-yellow-700";
        }

        return (
          <View
            key={customer.id}
            className="rounded-[10px] border border-gray-300 bg-white p-3 "
          >
            <View className="flex-row justify-between">
              <View>
                <Text className="text-[18px] font-semibold text-gray-900">
                  {customer.name}
                </Text>

                <Text className="mt-1 text-[16px] text-gray-500">
                  {customer.phone}
                </Text>
              </View>

              <View className="items-end">
                <Text className="text-[17px] text-gray-500">
                  {customer.address}
                </Text>

                <View className={`mt-2 rounded-full px-2 py-1 ${statusBg}`}>
                  <Text className={`text-[16px] font-semibold ${statusText}`}>
                    {customer.status}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        );
      })}
    </>
  );
};

export default CustomerListCard;
