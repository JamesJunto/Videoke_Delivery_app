import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import useAuth from "../../hooks/useAuth";

const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { handleRegister, loading } = useAuth();

  const handleSignUp = async () => {
    try {
      await handleRegister(email, password);
      router.replace("/screens/LoginScreen");
    } catch (error) {
      Alert.alert(
        "Registration Failed",
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    }
  };

  return (
    <View className="flex-1 justify-center bg-[#FFFDF9] px-6 py-8">
      <Text className="mb-2 text-3xl font-bold text-[#1F5A4B]">
        Create Account
      </Text>

      <Text className="mb-8 text-base text-[#6B8A84]">
        Sign up to get started.
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
        className="mb-6 border-0 border-b border-[#B8CBC1] px-1 py-3 text-[#263B33] outline-none focus:outline-none"
      />

      <TextInput
        placeholder="Enter your password"
        placeholderTextColor="#9AA9A3"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!loading}
        className="mb-8 border-0 border-b border-[#B8CBC1] px-1 py-3 text-[#263B33] outline-none focus:outline-none"
      />

      <TouchableOpacity
        onPress={handleSignUp}
        disabled={loading}
        className={`items-center rounded-xl bg-[#1F5A4B] p-4 ${
          loading ? "opacity-70" : "opacity-100"
        }`}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text className="text-base font-bold text-white">
            Sign Up
          </Text>
        )}
      </TouchableOpacity>

      <View className="mt-6 flex-row justify-center">
        <Text className="text-[#6B8A84]">
          Already have an account?{" "}
        </Text>

        <TouchableOpacity
          disabled={loading}
          onPress={() => router.push("/screens/LoginScreen")}
        >
          <Text className="font-bold text-[#1F5A4B]">
            Log In
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;
