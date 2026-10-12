import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
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
      console.log("Login user:", response);
    } catch (error) {
      console.log("Login Error:", error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: "white",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
        Sign In
      </Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!loading}
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
        editable={!loading}
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
        disabled={loading}
        style={{
          backgroundColor: "#C1272D",
          padding: 14,
          borderRadius: 6,
          alignItems: "center",
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
            }}
          >
            Sign In
          </Text>
        )}
      </Pressable>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        <Text style={{ color: "#666" }}>
          Don't have an account?{" "}
        </Text>

        <Pressable
          disabled={loading}
          onPress={() => router.push("/screens/RegisterScreen")}
        >
          <Text style={{ color: "#C1272D", fontWeight: "bold" }}>
            Register
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
