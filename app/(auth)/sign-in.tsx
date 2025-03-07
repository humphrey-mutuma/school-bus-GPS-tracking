import { Link, router, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useAuthStore from "@/stores/auth-store";
export default function SignIn() {
  const { authenticate } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignIn = () => {
    // Add your sign-in logic here (e.g., API call to NestJS backend)
    console.log("Sign in with:", { email, password });
    // Example: Redirect to home on success
    router.push("/(root)/(tabs)/home");
  };

  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-slate-100">
      <ScrollView className="flex-1 w-full h-full">
        <View className="flex-1 w-full h-full  m-auto self-center mt-6">
          <View className="p-2 w-full">
            <View className="flex-1 justify-center items-center  p-4">
              <Text className="text-2xl font-bold text-gray-800 mb-6">
                Sign In to Bus Tracker
              </Text>

              <View className="w-full max-w-sm">
                {/* email Input */}
                <TextInput
                  className="w-full p-3 mb-4 bg-white border border-gray-300 rounded-lg text-gray-700"
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                />

                {/* Password Input */}
                <TextInput
                  className="w-full p-3 mb-6 bg-white border border-gray-300 rounded-lg text-gray-700"
                  placeholder="Password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoCapitalize="none"
                />

                {/* Sign In Button */}
                <TouchableOpacity
                  className="w-full p-3 bg-blue-500 rounded-lg"
                  onPress={handleSignIn}
                  activeOpacity={0.7}
                >
                  <Text className="text-white text-center font-semibold text-lg">
                    Sign In
                  </Text>
                </TouchableOpacity>

                {/* Optional: Link to Sign Up */}
                <TouchableOpacity
                  className="mt-4"
                  onPress={() => router.push("/(auth)/sign-up")} // Assuming you have a signup route
                >
                  <Text className="text-blue-500 text-center">
                    Don't have an account? Sign Up
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
