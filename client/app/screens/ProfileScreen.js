import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

import CustomerListCard from "../../components/CustomersComponents/CustomerListCard";

const ProfileScreen = () => {
  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView
        className="flex-1 px-3"
        contentContainerClassName="pb-24 pt-20"
      >
        <Text className="mb-4 text-xl font-bold text-gray-900">Customers</Text>
        <View className="gap-2">
          <CustomerListCard />
        </View>
      </ScrollView>

      <View className="absolute left-0 right-0 top-0 h-16 bg-[#ffff] border-b border-gray-300 px-3 pt-2">
        <View className="absolute left-3 right-3 top-2 bg-white z-10 rounded-[10px] border border-gray-200 ">
          <View className="rounded-[10px] border border-gray-300 px-4">
            <TextInput
              placeholder="Search for customer..."
              placeholderTextColor="#9CA3AF"
              className="h-10 text-sm text-gray-900 "
            />
          </View>
        </View>
      </View>


    </View>
  );
};

export default ProfileScreen;
