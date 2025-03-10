// app/(auth)/signIn.js
import React, { useState } from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import authService from "@/services/auth/auth.service";
import { Roles } from "@/enums";
import { Toast } from "toastify-react-native";
import useAuthStore from "@/stores/auth-store";
import { SessionUser } from "@/types";
import { Button, TextInput, Text } from "react-native-paper";

export default function SignIn() {
  const { email: paramsEmail } = useLocalSearchParams();
  const { setUserData, setAccessToken } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState<string>(paramsEmail?.toString());
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<string>("PARENT"); // Default role

  const router = useRouter();

  const handleSignIn = async () => {
    if (!email) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      setIsLoading(true);

      const payload = {
        email,
        password,
      };

      const logInUser = await authService.login(payload);
      if (logInUser) {
        const data: SessionUser = {
          id: logInUser.data.id,
          name: logInUser.data.name,
          email: logInUser.data.email,
          role: logInUser.data.role,
          school: logInUser.data.school,
        };
        setUserData(data);
        setAccessToken(logInUser.data.accessToken);
        Toast.success(logInUser.message);
        router.replace("/(root)/(tabs)/home");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f3f4f6", padding: 16 }}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View style={{ width: "100%", maxWidth: 320, gap: 15 }}>
          <Text variant="headlineSmall">Get Started with Bus Tracker</Text>
          {/* email */}
          <TextInput
            style={{}}
            label="Email"
            value={email}
            // onChangeText={setEmail}
            autoCapitalize="none"
            editable={false}
            mode="outlined"
          />

          <TextInput
            style={{}}
            label="Password"
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
            secureTextEntry
            mode="outlined"
          />

          {/* Sign Up Button */}
          <Button
            disabled={isLoading}
            style={{}}
            onPress={handleSignIn}
            mode={"outlined"}
          >
            <Text>{isLoading ? "Loading..." : " Sign In"}</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}
