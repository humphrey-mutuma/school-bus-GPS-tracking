// app/(auth)/Register.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { RegisterDto } from "@/services/auth/dto/auth.dto";
import authService from "@/services/auth/auth.service";
import { Toast } from "toastify-react-native";

export default function Register() {
  const { email: paramsEmail } = useLocalSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState(paramsEmail?.toString());
  const [password, setPassword] = useState("");
  const [schoolAddress, setSchoolAddress] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [fullName, setFullName] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    if (!email || !password || !fullName) {
      alert("Please fill in all required fields");
      return;
    }

    const payload: RegisterDto = {
      email,
      password,
      role: "ADMIN",
      name: fullName,
      schoolName,
      schoolAddress,
    };

    try {
      setIsLoading(true);

      const new_admin = await authService.register(payload);
      if (new_admin) {
        Toast.success("Successfully registered, please login");

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
          Create Account
        </Text>

        <View className="w-full max-w-sm">
          {/* Full Name */}
          <TextInput
            className="w-full p-3 mb-4 bg-white border border-gray-300 rounded-sm text-gray-700"
            placeholder="Full Name"
            value={fullName}
            onChangeText={setFullName}
          />
          {/* email */}
          <TextInput
            className="w-full outline-0 p-3 mb-4 bg-white border border-gray-300 rounded-sm text-gray-700"
            placeholder="email"
            value={email}
            // onChangeText={setEmail}
            autoCapitalize="none"
            editable={false}
          />
          {/* Password */}
          <TextInput
            className="w-full p-3 mb-4 bg-white border border-gray-300 rounded-sm text-gray-700"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
          />
          <View className="my-1 outline-1"></View>
          {/* School Name Input */}
          <TextInput
            className="w-full p-3 mb-4 bg-gray-50 border border-gray-300 rounded-sm text-gray-700"
            placeholder="Enter school name"
            value={schoolName}
            onChangeText={setSchoolName}
            autoCapitalize="words"
          />
          {/* Address Input */}
          <TextInput
            className="w-full p-3 mb-4 bg-gray-50 border border-gray-300 rounded-sm text-gray-700"
            placeholder="Enter school address"
            value={schoolAddress}
            onChangeText={setSchoolAddress}
            autoCapitalize="words"
          />
          {/* Sign Up Button */}
          <TouchableOpacity
            disabled={isLoading}
            className="w-full p-3 bg-blue-500 rounded-sm mb-4"
            onPress={handleRegister}
            activeOpacity={0.7}
          >
            <Text className="text-white text-center font-semibold text-lg">
              {isLoading ? "Saving..." : "  Sign Up"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
