// app/profile.tsx
import { View,  } from "react-native";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import useAuthStore from "@/stores/auth-store";
import { Roles } from "@/enums";
import schoolsService from "@/services/schools/schools.service";
import { Button, Divider, Text } from "react-native-paper";
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
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f3f4f6",
        }}
      >
        <Text variant="headlineSmall">Not logged in</Text>
        <Button
          mode="outlined"
          onPress={() => router.push("/(auth)/verify-email")}
        >
          <Text>Go to Login</Text>
        </Button>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#F3F4F6", padding: 20 }}>
      {/* Header */}
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          color: "#1F2937",
          marginBottom: 32,
          textAlign: "center",
        }}
      >
        Profile
      </Text>

      {/* User Info Card */}
      <View
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: 12,
          padding: 12,
          marginBottom: 24,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: "#4B5563",
              width: 96,
            }}
          >
            Name:
          </Text>
          <Text style={{ fontSize: 18, color: "#111827", flex: 1 }}>
            {userData?.name || "Not provided"}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: "#4B5563",
              width: 96,
            }}
          >
            Email:
          </Text>
          <Text style={{ fontSize: 18, color: "#111827", flex: 1 }}>
            {userData?.email}
          </Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: "#4B5563",
              width: 96,
            }}
          >
            Role:
          </Text>
          <Text style={{ fontSize: 18, color: "#111827", flex: 1 }}>
            {userData?.role}
          </Text>
        </View>

        <Divider style={{ marginVertical: 15 }} />

        {/* Logout Button */}
        <Button onPress={handleLogout} mode="outlined">
          Logout
        </Button>
      </View>
    </View>
  );
}
