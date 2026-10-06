
import { Text, View } from "react-native";

const NotificationList = () => {
  const notifications = [
    {
      id: 1,
      title: "Order Update",
      message: "Your order #1001 is now on the way.",
      status: "On the way",
      date: "10 mins ago",
    },
    {
      id: 2,
      title: "New Product",
      message: "A new Videoke Machine is now available.",
      status: "New",
      date: "1 hour ago",
    },
    {
      id: 3,
      title: "Order Delivered",
      message: "Your order #998 has been successfully delivered.",
      status: "Delivered",
      date: "Yesterday",
    },
    {
      id: 4,
      title: "New Product",
      message: "Wireless Microphone is now available.",
      status: "New",
      date: "Yesterday",
    },
  ];

  return (
    <>
      {notifications.map((notification) => {
        let statusBg = "bg-gray-100";
        let statusText = "text-gray-600";

        if (notification.status === "Delivered") {
          statusBg = "bg-green-100";
          statusText = "text-green-700";
        } else if (notification.status === "On the way") {
          statusBg = "bg-blue-100";
          statusText = "text-blue-700";
        } else if (notification.status === "New") {
          statusBg = "bg-red-100";
          statusText = "text-[#C1272D]";
        }

        return (
          <View
            key={notification.id}
            className="h-20 flex-row items-center justify-between rounded-[8px] border border-gray-300 bg-white p-4 shadow-sm"
          >
            <View className="flex-1">
              <Text className="text-[17px] font-semibold text-gray-800">
                {notification.title}
              </Text>

              <Text className="mt-1 text-xs text-gray-600">
                {notification.message}
              </Text>
            </View>

            <View className="items-end">
              <View className={`ml-2 rounded-full px-2 py-1 ${statusBg}`}>
                <Text
                  className={`text-center text-[12px] font-semibold ${statusText}`}
                >
                  {notification.status}
                </Text>
              </View>

              <Text className="ml-2 mt-1 text-[12px] text-gray-500">
                {notification.date}
              </Text>
            </View>
          </View>
        );
      })}
    </>
  );
};

export default NotificationList;
