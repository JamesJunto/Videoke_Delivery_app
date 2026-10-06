import { Pressable, ScrollView, Text, View } from "react-native";
import NotificationList from "../../components/NotificationComponents/NotificationList";
const NotificationScreen = () => {
  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView
        className="flex-1 px-3"
        contentContainerClassName="pb-24 pt-5"
      >

        <View className="flex-col gap-y-2">
          <NotificationList />
        </View>
      </ScrollView>

      </View>
  );
};

export default NotificationScreen;
