import { ScrollView, Text, View } from "react-native";

import HomeCards from "../../components/HomeComponents/ProductCard";
const HomeScreen = () => {
return (
    <ScrollView className="flex-1" contentContainerClassName="px-3 py-4">

      <View className="flex-col  gap-y-3">
        <HomeCards />
      </View>

    </ScrollView>
  );
};

export default HomeScreen;
