import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  Alert
} from "react-native";
import { useRouter } from "expo-router";
import useAuth from "../../hooks/useAuth";

export default function Login() {
  const router = useRouter();
  const { handleLogin, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    try {
      const response = await handleLogin(email, password);

      if (!response.success) {
        Alert.alert(
          "Login Failed",
          response.message || "Invalid email or password."
        );
        return;
      }

      router.replace("/screens/DashboardScreen");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";

      Alert.alert("Login Failed", message);
    }
  };

  return (
    <View className="flex-1 justify-center bg-[#FFFDF9] px-6 py-8">
      <Text className="mb-2 text-3xl font-bold text-[#1F5A4B]">
        Welcome Back
      </Text>

      <Text className="mb-8 text-base text-[#6B8A84]">
        Sign in to your Videoke Delivery account
      </Text>



      <TextInput
        placeholder="Enter your email"
        placeholderTextColor="#9AA9A3"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        editable={!loading}
        className="mb-6 border-0 border-b border-[#B8CBC1] px-1 py-3  text-[#1F5A4B] outline-none focus:outline-none"
      />

      <TextInput
        placeholder="Enter your password"
        placeholderTextColor="#9AA9A3"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!loading}
        className="mb-8 border-0 border-b border-[#B8CBC1] px-1 py-3  text-[#1F5A4B] outline-none focus:outline-none"
      />

      <Pressable
        onPress={handleSignIn}
        disabled={loading}
        className={`items-center rounded-xl bg-[#1F5A4B] p-4 ${
          loading ? "opacity-70" : "opacity-100"
        }`}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text className="text-base font-bold text-white">
            Sign In
          </Text>
        )}
      </Pressable>

      <View className="mt-6 flex-row justify-center">
        <Text className="text-[#6B8A84]">
          Don't have an account?{" "}
        </Text>

        <Pressable
          disabled={loading}
          onPress={() => router.push("/screens/RegisterScreen")}
        >
          <Text className="font-bold text-[#1F5A4B]">
            Register
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
