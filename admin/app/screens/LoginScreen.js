import { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { getAuth }  from "../../services/authService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    try {
      const response = await getAuth(email, password)
      console.log("Login user:", response);

    } catch (error) {
      console.log(error)
    }
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: "white",
        justifyContent:"center"
      }}
    >
      <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 20 }}>
        Sign In
      </Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={{
          borderWidth: 1,
          borderColor: "#ddd",
          padding: 12,
          borderRadius: 6,
          marginBottom: 12,

        }}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          borderWidth: 1,
          borderColor: "#ddd",
          padding: 12,
          borderRadius: 6,
          marginBottom: 12,
        }}
      />

      <Pressable
        onPress={handleSignIn}
        style={{
          backgroundColor: "#C1272D",
          padding: 14,
          borderRadius: 6,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>
          Sign In
        </Text>
      </Pressable>
    </View>
  );
}
