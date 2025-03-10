// app/(auth)/VerifyEmail.js
import React, { useState } from "react";
import { TouchableOpacity, ScrollView, View } from "react-native";
import { useRouter } from "expo-router";
import authService from "@/services/auth/auth.service";
import { Toast } from "toastify-react-native";
import { Text, TextInput, Button, RadioButton } from "react-native-paper";

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
        Toast.error("You are not listed with any school!");
        return;
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
            label="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            mode="outlined"
          />

          {/* Role Selection with Radio Buttons */}
          <Text
            style={{ color: "#374151", fontWeight: "600", marginBottom: 8 }}
          >
            Select Role:
          </Text>
          <View style={{ marginBottom: 16 }}>
            {/* Parent Radio */}
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 8,
              }}
              onPress={() => setRole("PARENT")}
            >
              <View
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 9999,
                  borderWidth: 2,
                  borderColor: "#3b82f6",
                  marginRight: 8,
                  backgroundColor: role === "PARENT" ? "#3b82f6" : "white",
                }}
              />
              <Text style={{ color: "#374151" }}>Parent</Text>
            </TouchableOpacity>

            {/* Driver Radio */}

            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 8,
              }}
              onPress={() => setRole("DRIVER")}
            >
              <View
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 9999,
                  borderWidth: 2,
                  borderColor: "#3b82f6",
                  marginRight: 8,
                  backgroundColor: role === "DRIVER" ? "#3b82f6" : "white",
                }}
              />
              <Text style={{ color: "#374151" }}>Driver</Text>
            </TouchableOpacity>

            {/* Admin Radio */}
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 8,
              }}
              onPress={() => setRole("ADMIN")}
            >
              <View
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 9999,
                  borderWidth: 2,
                  borderColor: "#3b82f6",
                  marginRight: 8,
                  backgroundColor: role === "ADMIN" ? "#3b82f6" : "white",
                }}
              />
              <Text style={{ color: "#374151" }}>Admin (Principal)</Text>
            </TouchableOpacity>
          </View>

          {/* Sign Up Button */}
          <Button
            disabled={isLoading}
            style={{}}
            onPress={handleVerifyEmail}
            mode="outlined"
          >
            <Text>{isLoading ? "Verifying..." : "Join"}</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}
