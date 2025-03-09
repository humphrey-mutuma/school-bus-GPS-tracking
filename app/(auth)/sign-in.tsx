// app/(auth)/signIn.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import authService from "@/services/auth/auth.service";
import { Roles } from "@/enums";
import { Toast } from "toastify-react-native";
import useAuthStore from "@/stores/auth-store";
import { SessionUser } from "@/types";

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
    <ScrollView className="flex-1 bg-gray-100 p-4">
      <View className="justify-center items-center">
        <Text className="text-2xl font-bold text-gray-800 mb-6 mt-4">
          Get Started with Bus Tracker
        </Text>

        <View className="w-full max-w-sm">
          {/* email */}
          <TextInput
            className="w-full outline-0  p-3 mb-4 bg-white border border-gray-300 rounded-lg text-gray-700"
            placeholder="Email"
            value={email}
            // onChangeText={setEmail}
            autoCapitalize="none"
            editable={false}
          />

          <TextInput
            className="w-full p-3 mb-4 bg-white border border-gray-300 rounded-lg text-gray-700"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
            secureTextEntry
          />

          {/* Conditional Fields Based on Role */}

          {/* Sign Up Button */}
          <TouchableOpacity
            disabled={isLoading}
            className="w-full p-3 bg-blue-500 rounded-lg mb-4"
            onPress={handleSignIn}
            activeOpacity={0.7}
          >
            <Text className="text-white text-center font-semibold text-lg">
              {isLoading ? "Loading..." : " Sign In"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
