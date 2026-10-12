import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

const Register = () => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { handleRegister } = useAuth();

  const handleSignUp = async () => {
    try {
      const response = await handleRegister(first_name,last_name,phone,address, email, password);

      console.log("SignUp user:", response);
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
        placeholder="First Name"
        value={first_name}
        onChangeText={setFirstName}
        className="mb-4 rounded-sm border border-gray-300 p-3"
      />

      <TextInput
        placeholder="Last Name"
        value={last_name}
        onChangeText={setLastName}
        className="mb-4 rounded-sm border border-gray-300 p-3"
      />

      <TextInput
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        className="mb-4 rounded-sm border border-gray-300 p-3"
      />

      <TextInput
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
        className="mb-4 rounded-sm border border-gray-300 p-3"
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        className="mb-4 rounded-sm border border-gray-300 p-3"
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="mb-6 rounded-sm border border-gray-300 p-3"
      />

      <TouchableOpacity
        onPress={handleSignUp}
        className="items-center rounded-md bg-[#C1272D] p-3"
      >
        <Text className="font-bold text-white">Sign Up</Text>
      </TouchableOpacity>

      <View className="mt-6 flex-row justify-center">
        <Text className="text-gray-500">
          Already have an account?{" "}
        </Text>

        <TouchableOpacity>
          <Text className="font-bold text-[#C1272D]">
            Log In
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;
