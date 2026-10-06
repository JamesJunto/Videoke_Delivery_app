import { Pressable, ScrollView, Text, View } from "react-native";

const user = {
  name: "Oskar Dirlewanger",
  email: "Oskar Dirlewanger@example.com",
  role: "Dirlewanger Brigade commander",

};

const accountItems = [
  { id: "edit", label: "Edit profile" },
  { id: "password", label: "Change password" },
];


const getInitials = (name) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const MenuGroup = ({ title, items, onPress }) => (
  <View className="mt-6">
    <Text className="mb-2 px-1 text-sm font-semibold text-gray-500">
      {title}
    </Text>
    <View className="overflow-hidden rounded-[10px] border border-gray-200 bg-white">
      {items.map((item, index) => (
        <Pressable
          key={item.id}
          onPress={() => onPress?.(item.id)}
          className={`flex-row items-center justify-between px-4 py-4 active:bg-gray-50 ${
            index !== items.length - 1 ? "border-b border-gray-200" : ""
          }`}
        >
          <Text className="text-sm text-gray-900">{item.label}</Text>
          <Text className="text-lg text-gray-400">›</Text>
        </Pressable>
      ))}
    </View>
  </View>
);

const ProfileScreen = () => {
  const handleMenuPress = (id) => {
    console.log("Pressed:", id);
  };

  const handleLogout = () => {
    console.log("Logout");
  };

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView
        className="flex-1 px-3"
        contentContainerClassName="pb-24 pt-6"
      >
        <Text className="mb-4 text-xl font-bold text-gray-900">Profile</Text>

        <View className="items-center rounded-[10px] border border-gray-300 bg-white px-4 py-6">
          <View className="h-20 w-20 items-center justify-center rounded-full  bg-[#B22222]">
            <Text className="text-2xl font-bold text-white">
              {getInitials(user.name)}
            </Text>
          </View>
          <Text className="mt-3 text-lg font-bold text-gray-900">
            {user.name}
          </Text>
          <Text className="text-sm text-gray-500">{user.email}</Text>
          <View className="mt-2 rounded-full bg-gray-100 px-3 py-1">
            <Text className="text-xs font-medium text-gray-700">
              {user.role}
            </Text>
          </View>
        </View>

        <MenuGroup
          title="Account"
          items={accountItems}
          onPress={handleMenuPress}
        />


        <Pressable
          onPress={handleLogout}
          className="mt-6 items-center rounded-[10px] border border-red-200 bg-white py-3 active:bg-red-50"
        >
          <Text className="text-sm font-semibold text-red-600">Log out</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
