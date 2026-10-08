import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Login() {
  return (
    <View>
      <Text>Login</Text>

      <Pressable onPress={() => router.replace("/screens/HomeScreen")}>
        <Text>Sign In</Text>
      </Pressable>
    </View>
  );
}
