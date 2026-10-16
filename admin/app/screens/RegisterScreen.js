import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
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
      await handleRegister( email,password );

      router.replace("/screens/LoginScreen");
    } catch (error) {
      console.log("SignUp Error:", error);
    }
  };


  return (
    <View className="flex-1 justify-center bg-white px-6">
      <Text className="mb-2 text-3xl font-bold text-gray-900">
        Create Account
      </Text>

      <Text className="mb-8 text-gray-500">
        Sign up to get started.
      </Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!loading}
        className="mb-4 rounded-sm border border-gray-300 p-3"
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!loading}
        className="mb-6 rounded-sm border border-gray-300 p-3"
      />

      <TouchableOpacity
        onPress={handleSignUp}
        disabled={loading}
        className="items-center rounded-md bg-[#C1272D] p-3"
        style={{ opacity: loading ? 0.7 : 1 }}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="font-bold text-white">
            Sign Up
          </Text>
        )}
      </TouchableOpacity>

      <View className="mt-6 flex-row justify-center">
        <Text className="text-gray-500">
          Already have an account?{" "}
        </Text>

        <TouchableOpacity
          disabled={loading}
          onPress={() => router.push("/login")}
        >
          <Text className="font-bold text-[#C1272D]">
            Log In
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;
