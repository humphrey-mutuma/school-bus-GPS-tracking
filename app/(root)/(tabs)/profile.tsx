// app/profile.tsx
import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import useAuthStore from "@/stores/auth-store";
import { Roles } from "@/enums";
import schoolsService from "@/services/schools/schools.service";
import { Button, Divider } from "react-native-paper";
export default function ProfileScreen() {
  const { userData, logOut } = useAuthStore();
  const [schoolName, setSchoolName] = useState<string | null>(null);

  // Fetch school name if user is an admin
  useEffect(() => {
    if (userData?.role === Roles.ADMIN) {
      const fetchSchool = async () => {
        try {
          const response = await schoolsService.findSchool(userData.id);
          setSchoolName(response.data.name);
        } catch (error) {
          console.error("Error fetching school:", error);
        }
      };
      fetchSchool();
    }
  }, [userData]);

  const handleLogout = () => {
    logOut();
    router.replace("/(auth)/verify-email");
  };

  if (!userData) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-lg text-gray-700">Not logged in</Text>
        <Pressable
          className="mt-4 px-6 py-2 bg-blue-500 rounded-lg"
          onPress={() => router.push("/(auth)/verify-email")}
        >
          <Text className="text-white font-semibold">Go to Login</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100 p-5">
      {/* Header */}
      <Text className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Profile
      </Text>

      {/* User Info Card */}
      <View className="bg-white rounded-xl   p-3 mb-6">
        <View className="flex-row items-center mb-4">
          <Text className="text-lg font-semibold text-gray-700 w-24">
            Name:
          </Text>
          <Text className="text-lg text-gray-900 flex-1">
            {userData?.name || "Not provided"}
          </Text>
        </View>
        <View className="flex-row items-center mb-4">
          <Text className="text-lg font-semibold text-gray-700 w-24">
            Email:
          </Text>
          <Text className="text-lg text-gray-900 flex-1">
            {userData?.email}
          </Text>
        </View>
        <View className="flex-row items-center">
          <Text className="text-lg font-semibold text-gray-700 w-24">
            Role:
          </Text>
          <Text className="text-lg text-gray-900 flex-1">{userData?.role}</Text>
        </View>

        <Divider style={{ marginVertical: 15 }} />
        {/* Logout Button */}
        <Button
          // className="bg-red-500 py-2 rounded-lg active:bg-red-600"
          onPress={handleLogout}
          // icon=""
          mode="outlined"
        >
          Logout
        </Button>
      </View>
    </View>
  );
}
