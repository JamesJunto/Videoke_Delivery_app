import { Text, View } from "react-native";
import useCustomer from "../../hooks/useCustomer";
const CustomerListCard = () => {
  const customers = useCustomer()
  return (
    <>
      {customers.map((customer) => {
        let statusBg = "bg-gray-100";
        let statusText = "text-gray-600";

        if (customer.status === "delivered") {
          statusBg = "bg-green-100";
          statusText = "text-green-700";
        } else if (customer.status === "ongoing") {
          statusBg = "bg-blue-100";
          statusText = "text-blue-700";
        } else if (customer.status === "pending") {
          statusBg = "bg-yellow-100";
          statusText = "text-yellow-700";
        }

        return (
          <View
            key={customer.customer_id}
            className="rounded-[10px] border border-gray-300 bg-white p-3 "
          >
            <View className="flex-row justify-between">
              <View>
                <Text className="text-[18px] font-semibold text-gray-900">
                  {customer.FullName}
                </Text>

                <Text className="mt-1 text-[16px] text-gray-500">
                  {customer.phone}
                </Text>
              </View>

              <View className="items-end">
                <View
                  className={`mt-1 mb-1 rounded-full px-2 py-1 ${statusBg}`}
                >
                  <Text className={`text-[16px] font-semibold ${statusText}`}>
                    {customer.status}
                  </Text>
                </View>
                <Text className="text-[17px] text-gray-500">
                  {customer.address}
                </Text>
              </View>
            </View>
          </View>
        );
      })}
    </>
  );
};

export default CustomerListCard;
