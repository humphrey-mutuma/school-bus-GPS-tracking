// app/(auth)/CreatePassword.js
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
import { Toast } from "toastify-react-native";

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
    <ScrollView className="flex-1 bg-gray-100 p-4">
      <View className="justify-center items-center">
        <Text className="text-2xl font-bold text-gray-800 mb-6 mt-4">
          Create a Password
        </Text>

        <View className="w-full max-w-sm">
          {/* email */}
          <TextInput
            className="w-full outline-0 p-3 mb-4 bg-white border border-gray-300 rounded-lg text-gray-700"
            placeholder="email"
            value={email}
            // onChangeText={setEmail}
            autoCapitalize="none"
            editable={false}
          />

          {/* Password */}
          <TextInput
            className="w-full p-3 mb-4 bg-white border border-gray-300 rounded-lg text-gray-700"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
          />

          {/* Sign Up Button */}
          <TouchableOpacity
            disabled={isLoading}
            className="w-full p-3 bg-blue-500 rounded-lg mb-4"
            onPress={handleCreatePassword}
            activeOpacity={0.7}
          >
            <Text className="text-white text-center font-semibold text-lg">
              {isLoading ? "Saving..." : "Save Password"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
