import { Text, View } from "react-native";
import { RecentDeliveriesData } from "../../data/DashboardData";

const RecentDeliveries = () => {
  return (
    <>
      {RecentDeliveriesData.map((delivery) => {
        let statusBg = "bg-gray-100";
        let statusText = "text-gray-600";

        if (delivery.status === "Delivered") {
          statusBg = "bg-green-100";
          statusText = "text-green-700";
        } else if (delivery.status === "Out for Delivery") {
          statusBg = "bg-blue-100";
          statusText = "text-blue-700";
        } else if (delivery.status === "Pending") {
          statusBg = "bg-yellow-100";
          statusText = "text-yellow-700";
        }

        return (
          <View
            key={delivery.id}
            className="rounded-[5px] bg-white p-4 h-20 border border-gray-300 flex-row justify-between items-center shadow-sm"
          >
            <View>
              <Text className="text-[20px] font-semibold text-gray-800">
                {delivery.customer}
              </Text>

              <Text className="mt-1 text-xs text-gray-700">
                {delivery.address}
              </Text>
            </View>

            <View>
              <View
                className={`rounded-full ml-2 w-full  px-1 py-1 ${statusBg}`}
              >
                <Text
                  className={`text-[14px] text-center font-semibold ${statusText}`}
                >
                  {delivery.status}
                </Text>
              </View>

              <Text className="mt-1 ml-4 text-[17px] text-gray-600">
                {delivery.date}
              </Text>
            </View>
          </View>
        );
      })}
    </>
  );
};

export default RecentDeliveries;
