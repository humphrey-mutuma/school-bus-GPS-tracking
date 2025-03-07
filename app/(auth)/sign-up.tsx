// app/(auth)/signup.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("parent"); // Default role
  const [fullName, setFullName] = useState("");
  const [childName, setChildName] = useState(""); // Parent-specific
  const [childSchool, setChildSchool] = useState(""); // Parent-specific
  const [licenseNumber, setLicenseNumber] = useState(""); // Driver-specific
  const [busNumber, setBusNumber] = useState(""); // Driver-specific
  const [schoolName, setSchoolName] = useState(""); // Admin-specific
  const router = useRouter();

  const handleSignUp = () => {
    if (!username || !password || !fullName) {
      alert("Please fill in all required fields");
      return;
    }
    if (role === "parent" && (!childName || !childSchool)) {
      alert("Please provide child’s name and school");
      return;
    }
    if (role === "driver" && (!licenseNumber || !busNumber)) {
      alert("Please provide driver’s license and bus number");
      return;
    }
    if (role === "admin" && !schoolName) {
      alert("Please provide school name");
      return;
    }

    const payload = {
      username,
      password,
      role,
      fullName,
      ...(role === "parent" && { childName, childSchool }),
      ...(role === "driver" && { licenseNumber, busNumber }),
      ...(role === "admin" && { schoolName }),
    };

    console.log("Sign up with:", payload);
    router.push("/(auth)/sign-in");
  };

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      <View className="justify-center items-center">
        <Text className="text-2xl font-bold text-gray-800 mb-6 mt-4">
          Sign Up for Bus Tracker
        </Text>

        <View className="w-full max-w-sm">
          {/* Username */}
          <TextInput
            className="w-full p-3 mb-4 bg-white border border-gray-300 rounded-lg text-gray-700"
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
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

          {/* Full Name */}
          <TextInput
            className="w-full p-3 mb-4 bg-white border border-gray-300 rounded-lg text-gray-700"
            placeholder="Full Name"
            value={fullName}
            onChangeText={setFullName}
          />

          {/* Role Selection with Radio Buttons */}
          <Text className="text-gray-700 font-semibold mb-2">Select Role:</Text>
          <View className="mb-4">
            {/* Parent Radio */}
            <TouchableOpacity
              className="flex-row items-center mb-2"
              onPress={() => setRole("parent")}
            >
              <View
                className={`w-6 h-6 rounded-full border-2 border-blue-500 mr-2 ${
                  role === "parent" ? "bg-blue-500" : "bg-white"
                }`}
              />
              <Text className="text-gray-700">Parent</Text>
            </TouchableOpacity>

            {/* Driver Radio */}
            <TouchableOpacity
              className="flex-row items-center mb-2"
              onPress={() => setRole("driver")}
            >
              <View
                className={`w-6 h-6 rounded-full border-2 border-blue-500 mr-2 ${
                  role === "driver" ? "bg-blue-500" : "bg-white"
                }`}
              />
              <Text className="text-gray-700">Driver</Text>
            </TouchableOpacity>

            {/* Admin Radio */}
            <TouchableOpacity
              className="flex-row items-center mb-2"
              onPress={() => setRole("admin")}
            >
              <View
                className={`w-6 h-6 rounded-full border-2 border-blue-500 mr-2 ${
                  role === "admin" ? "bg-blue-500" : "bg-white"
                }`}
              />
              <Text className="text-gray-700">Admin (Principal)</Text>
            </TouchableOpacity>
          </View>

          {/* Conditional Fields Based on Role */}
          {role === "parent" && (
            <>
              <TextInput
                className="w-full p-3 mb-4 bg-white border border-gray-300 rounded-lg text-gray-700"
                placeholder="Child's Name"
                value={childName}
                onChangeText={setChildName}
              />
              <TextInput
                className="w-full p-3 mb-4 bg-white border border-gray-300 rounded-lg text-gray-700"
                placeholder="Child's School"
                value={childSchool}
                onChangeText={setChildSchool}
              />
            </>
          )}

          {role === "driver" && (
            <>
              <TextInput
                className="w-full p-3 mb-4 bg-white border border-gray-300 rounded-lg text-gray-700"
                placeholder="Driver's License Number"
                value={licenseNumber}
                onChangeText={setLicenseNumber}
              />
              <TextInput
                className="w-full p-3 mb-4 bg-white border border-gray-300 rounded-lg text-gray-700"
                placeholder="Assigned Bus Number"
                value={busNumber}
                onChangeText={setBusNumber}
              />
            </>
          )}

          {role === "admin" && (
            <TextInput
              className="w-full p-3 mb-4 bg-white border border-gray-300 rounded-lg text-gray-700"
              placeholder="School Name"
              value={schoolName}
              onChangeText={setSchoolName}
            />
          )}

          {/* Sign Up Button */}
          <TouchableOpacity
            className="w-full p-3 bg-blue-500 rounded-lg mb-4"
            onPress={handleSignUp}
            activeOpacity={0.7}
          >
            <Text className="text-white text-center font-semibold text-lg">
              Sign Up
            </Text>
          </TouchableOpacity>

          {/* Link to Sign In */}
          <TouchableOpacity onPress={() => router.push("/(auth)/sign-in")}>
            <Text className="text-blue-500 text-center">
              Already have an account? Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
