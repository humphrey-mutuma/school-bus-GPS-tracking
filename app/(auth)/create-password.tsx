// app/(auth)/CreatePassword.js
import React, { useState } from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import authService from "@/services/auth/auth.service";
import { Toast } from "toastify-react-native";
import { Text, TextInput, Button } from "react-native-paper";

export default function CreatePassword() {
  const { email: paramsEmail } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState(paramsEmail?.toString());
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleCreatePassword = async () => {
    if (!email || !password) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      setIsLoading(true);
      const payload = {
        email,
        password,
      };
      const res = await authService.createPassword(payload);
      if (res) {
        Toast.success("Password created, Please login");
        router.push({
          pathname: "/(auth)/sign-in", // Target screen route
          params: {
            email,
          },
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#f3f4f6", // Tailwind `bg-gray-100`
        padding: 16, // Tailwind `p-4`
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "100%",
            maxWidth: 320,
            gap: 15,
          }}
        >
          <Text variant="headlineSmall">Create a Password</Text>
          {/* email */}
          <TextInput
            label="email"
            value={email}
            // onChangeText={setEmail}
            autoCapitalize="none"
            editable={false}
            mode="outlined"
          />

          {/* Password */}
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            mode="outlined"
          />

          {/* Sign Up Button */}
          <Button
            disabled={isLoading}
            style={{}}
            onPress={handleCreatePassword}
            mode="outlined"
            buttonColor="primary"
          >
            <Text>{isLoading ? "Saving..." : "Save Password"}</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}
