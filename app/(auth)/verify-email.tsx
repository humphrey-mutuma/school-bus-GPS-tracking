// app/(auth)/VerifyEmail.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import authService from "@/services/auth/auth.service";
import { Toast } from "toastify-react-native";

export default function VerifyEmail() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<string>("PARENT"); // Defa
  const router = useRouter();

  const handleVerifyEmail = async () => {
    if (!email) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      setIsLoading(true);

      // find user by email
      const userExits = await authService.findByEmail(email);

 
      // user has pass, sign-in
      if (userExits.data?.hasPassword) {
        router.push({
          pathname: "/(auth)/sign-in", // Target screen route
          params: {
            email,
          },
        });
      }
      // user exists but no password
      if (userExits.data && !userExits.data?.hasPassword) {
        router.push({
          pathname: "/(auth)/create-password", // Target screen route
          params: {
            email,
          },
        });
      }
      // user does not exist and is applying as an admin
      if (!userExits.data && role == "ADMIN") {
        router.push({
          pathname: "/(auth)/register", // Target screen route
          params: {
            email,
          },
        });
      }
      // no user and is not applying as an admin
      if (!userExits.data && role !== "ADMIN") {
        Toast.error("You are not listed with any school!",);
        return;
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
            className="w-full p-3 mb-4 bg-white border border-gray-300 rounded-lg text-gray-700"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />

          {/* Role Selection with Radio Buttons */}
          <Text className="text-gray-700 font-semibold mb-2">Select Role:</Text>
          <View className="mb-4">
            {/* Parent Radio */}
            <TouchableOpacity
              className="flex-row items-center mb-2"
              onPress={() => setRole("PARENT")}
            >
              <View
                className={`w-6 h-6 rounded-full border-2 border-blue-500 mr-2 ${
                  role === "PARENT" ? "bg-blue-500" : "bg-white"
                }`}
              />
              <Text className="text-gray-700">Parent</Text>
            </TouchableOpacity>

            {/* Driver Radio */}
            <TouchableOpacity
              className="flex-row items-center mb-2"
              onPress={() => setRole("DRIVER")}
            >
              <View
                className={`w-6 h-6 rounded-full border-2 border-blue-500 mr-2 ${
                  role === "DRIVER" ? "bg-blue-500" : "bg-white"
                }`}
              />
              <Text className="text-gray-700">Driver</Text>
            </TouchableOpacity>

            {/* Admin Radio */}
            <TouchableOpacity
              className="flex-row items-center mb-2"
              onPress={() => setRole("ADMIN")}
            >
              <View
                className={`w-6 h-6 rounded-full border-2 border-blue-500 mr-2 ${
                  role === "ADMIN" ? "bg-blue-500" : "bg-white"
                }`}
              />
              <Text className="text-gray-700">Admin (Principal)</Text>
            </TouchableOpacity>
          </View>

          {/* Conditional Fields Based on Role */}

          {/* Sign Up Button */}
          <TouchableOpacity
            disabled={isLoading}
            className="w-full p-3 bg-blue-500 rounded-lg mb-4"
            onPress={handleVerifyEmail}
            activeOpacity={0.7}
          >
            <Text className="text-white text-center font-semibold text-lg">
              {isLoading ? "Checking..." : "Join"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
