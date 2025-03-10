// app/(auth)/Register.js
import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { RegisterDto } from "@/services/auth/dto/auth.dto";
import authService from "@/services/auth/auth.service";
import { Toast } from "toastify-react-native";
import { Button, Text, TextInput } from "react-native-paper";

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
    <ScrollView style={{ flex: 1, backgroundColor: "#f3f4f6", padding: 16 }}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View style={{ width: "100%", maxWidth: 320, gap: 15 }}>
          <Text variant="headlineSmall">Create Account</Text>
          {/* Full Name */}
          <TextInput
            style={{}}
            mode="outlined"
            label="Full Name"
            value={fullName}
            onChangeText={setFullName}
          />
          {/* Email */}
          <TextInput
            style={{}}
            mode="outlined"
            label="email"
            value={email}
            autoCapitalize="none"
            editable={false}
          />
          {/* Password */}
          <TextInput
            style={{}}
            mode="outlined"
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
          />
          <View style={{ marginVertical: 4, borderWidth: 1 }}></View>
          {/* School Name Input */}
          <TextInput
            style={{}}
            mode="outlined"
            label="Enter school name"
            value={schoolName}
            onChangeText={setSchoolName}
            autoCapitalize="words"
          />
          {/* Address Input */}
          <TextInput
            style={{}}
            mode="outlined"
            label="Enter school address"
            value={schoolAddress}
            onChangeText={setSchoolAddress}
            autoCapitalize="words"
          />
          {/* Sign Up Button */}
          <Button
            disabled={isLoading}
            style={{}}
            onPress={handleRegister}
            mode={"outlined"}
          >
            <Text>{isLoading ? "Saving..." : "  Sign Up"}</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}
